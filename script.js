document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const scanButton = document.getElementById('scanButton');
    const clearButton = document.getElementById('clearButton');
    const scannedItemsList = document.getElementById('scannedItemsList');
    const videoElement = document.getElementById('video');
    const scannerContainer = document.getElementById('scanner-container');
    const stopScanButton = document.getElementById('stopScanButton');
    const scanStatus = document.getElementById('scan-status');
    const csvFileInput = document.getElementById('csvFile');
    const dataStatus = document.getElementById('data-status');
    const manualBarcode = document.getElementById('manualBarcode');
    const manualAddButton = document.getElementById('manualAddButton');
    const manualStatus = document.getElementById('manual-status');
    const exportPdfButton = document.getElementById('exportPdfButton');
    // Price Toggle elements removed

    // State Variables
    let productData = {}; // Holds product info { barcode: { name, uom, bincode } } // Updated Structure
    let codeReader = null; // ZXing instance
    let isScanning = false;
    const STORAGE_KEY = 'barcodeScannerProductData';
    // HIDE_PRICE_STORAGE_KEY removed

    // --- Price Visibility Preference Removed ---

    // --- Data Management ---
    function loadDataFromLocalStorage() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            try {
                productData = JSON.parse(storedData);
                const itemCount = Object.keys(productData).length;
                if (itemCount > 0) {
                    console.log(`Product data loaded from localStorage: ${itemCount} items`);
                    dataStatus.textContent = ` (${itemCount} items loaded)`;
                    dataStatus.style.color = 'green';
                    scanButton.disabled = false; // Enable scanning
                    manualAddButton.disabled = false; // Enable manual add
                    return true;
                }
            } catch (e) {
                console.error("Error parsing data from localStorage", e);
                localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
            }
        }
        console.log("No valid data found in localStorage.");
        dataStatus.textContent = ' (No data loaded - Please upload CSV)';
        dataStatus.style.color = 'red';
        scanButton.disabled = true; // Keep disabled
        manualAddButton.disabled = true;
        return false;
    }

    function saveDataToLocalStorage() {
         const itemCount = Object.keys(productData).length;
        if (itemCount === 0) {
            console.warn("Attempted to save empty product data. Skipping.");
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(productData));
            console.log(`Product data (${itemCount} items) saved to localStorage.`);
        } catch (e) {
             console.error("Error saving data to localStorage (maybe size limit exceeded?)", e);
             alert("Could not save data for next time. Local storage might be full.");
             localStorage.removeItem(STORAGE_KEY);
        }
    }

    function handleFileSelect(event) {
        console.log("handleFileSelect triggered.");
        const file = event.target.files[0];
        if (!file) {
            console.log("No file selected in event.");
            return;
        }
        console.log(`File selected: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert("Please select a valid .csv file.");
            console.warn("Invalid file type selected.");
            event.target.value = null;
            return;
        }

        dataStatus.textContent = ' (Reading file...)';
        dataStatus.style.color = '#666';
        scanButton.disabled = true;
        manualAddButton.disabled = true; // Disable while loading

        const reader = new FileReader();

        reader.onload = function(e) {
            console.log("FileReader onload event fired.");
            const csvText = e.target.result;
            if (csvText) {
                console.log(`CSV text loaded (first 500 chars):\n${csvText.substring(0, 500)}`);
                parseCsvDataAndStore(csvText, file.name);
            } else {
                 console.error("FileReader result is empty.");
                 alert("Could not read content from the file.");
                 dataStatus.textContent = ' (Error reading file content)';
                 dataStatus.style.color = 'red';
            }
            event.target.value = null; // Reset input after processing
        };

        reader.onerror = function(e) {
            console.error("FileReader error event:", e);
            alert(`Error reading file: ${file.name}. Check console.`);
            dataStatus.textContent = ' (Error reading file)';
            dataStatus.style.color = 'red';
            event.target.value = null; // Reset input
        };

        reader.readAsText(file);
        console.log("FileReader readAsText called.");
    }

     function parseCsvDataAndStore(csvText, fileName) {
         console.log(`Attempting to parse CSV data from ${fileName || 'uploaded file'}...`);
         try {
             Papa.parse(csvText, {
                 header: true,
                 skipEmptyLines: true,
                 complete: function(results) {
                     console.log("PapaParse complete callback entered.");
                     console.log("Parsed results meta:", results.meta);
                     console.log("Parsed results errors:", results.errors);
                     console.log(`Parsed ${results.data.length} rows.`);

                     if (results.errors.length > 0) {
                         alert(`Errors found while parsing ${fileName || 'the file'}. Check console for details.`);
                         dataStatus.textContent = ' (Error parsing CSV)';
                         dataStatus.style.color = 'red';
                         productData = {};
                         localStorage.removeItem(STORAGE_KEY);
                         return;
                     }

                     // *** UPDATED requiredColumns ***
                     const requiredColumns = ['BARCODE', 'PRODUCTNAME', 'UOM', 'BINCODE'];
                      const actualHeaders = results.meta.fields.map(h => h.trim().toUpperCase()) || []; // Trim and uppercase for robust check
                      const requiredUpper = requiredColumns.map(col => col.toUpperCase());
                      const missingColumns = requiredUpper.filter(col => !actualHeaders.includes(col));


                     if (missingColumns.length > 0) {
                        console.error("CSV headers missing required columns:", missingColumns.join(', '));
                        alert(`Error processing CSV: Missing required columns: ${missingColumns.join(', ')}.\nFound headers: ${actualHeaders.join(', ')}`);
                        dataStatus.textContent = ' (CSV missing columns)';
                        dataStatus.style.color = 'red';
                        productData = {};
                        localStorage.removeItem(STORAGE_KEY);
                        return;
                     }

                     console.log("Required columns found. Proceeding to populate productData.");
                     productData = {}; // Clear previous data
                     let validRows = 0;
                     results.data.forEach((row, index) => {
                         const barcode = row.BARCODE?.trim(); // Use original case for key
                         if (barcode) {
                             // *** UPDATED Data Population ***
                             productData[barcode] = {
                                 name: row.PRODUCTNAME?.trim() || 'N/A',
                                 uom: row.UOM?.trim() || 'N/A',
                                 bincode: row.BINCODE?.trim() || 'N/A' // Get BINCODE
                                 // Removed price
                             };
                             validRows++;
                         } else {
                            if (index < 10) {
                                console.warn(`Skipping row ${index + 1} due to empty barcode:`, row);
                            } else if (index === 10) {
                                console.warn("Further empty barcode warnings suppressed.");
                            }
                         }
                     });

                     const itemCount = Object.keys(productData).length;
                     console.log(`Finished processing rows. ${itemCount} valid products stored.`);

                     if (itemCount > 0) {
                         console.log("Attempting to save data to localStorage and update UI.");
                         saveDataToLocalStorage();
                         dataStatus.textContent = ` (${itemCount} items loaded)`;
                         dataStatus.style.color = 'green';
                         scanButton.disabled = false; // Enable scanning
                         manualAddButton.disabled = false; // Enable manual add
                         console.log("Scan and Add buttons enabled.");
                         alert(`Successfully loaded ${itemCount} products from ${fileName || 'the file'}.`);
                     } else {
                         console.warn('The CSV file had no rows with valid barcodes.');
                         alert('The CSV file seems empty or had no valid product rows.');
                         dataStatus.textContent = ' (Loaded file was empty or invalid)';
                         dataStatus.style.color = 'orange';
                         scanButton.disabled = true;
                         manualAddButton.disabled = true;
                         localStorage.removeItem(STORAGE_KEY);
                     }
                 },
                 error: function(error) {
                     console.error('PapaParse Error callback:', error);
                     alert(`Failed to parse CSV file: ${error.message}`);
                     dataStatus.textContent = ' (Error parsing CSV)';
                     dataStatus.style.color = 'red';
                      productData = {};
                      localStorage.removeItem(STORAGE_KEY);
                 }
             });
         } catch (error) {
             console.error('Error within parseCsvDataAndStore function:', error);
             alert('An unexpected error occurred during parsing.');
              dataStatus.textContent = ' (Parsing error)';
              dataStatus.style.color = 'red';
              productData = {};
              localStorage.removeItem(STORAGE_KEY);
         }
     }


    // --- Barcode Lookup ---
    function lookupBarcode(barcode) {
        return productData[barcode] || null;
    }

    // --- Display Logic ---
    function displayItem(barcode, product) {
        const listItem = document.createElement('li');
        listItem.dataset.barcode = barcode; // Store barcode

         const existingItem = scannedItemsList.querySelector(`li[data-barcode="${barcode}"]`);
         if (existingItem) {
             console.log(`Barcode ${barcode} already in list.`);
              // Update status differently for scan vs manual add if needed
              if (isScanning) {
                 scanStatus.textContent = `Already scanned: ${product.name}`;
              } else {
                 manualStatus.textContent = `Already in list!`;
                 manualStatus.style.color = 'orange';
              }
              existingItem.style.backgroundColor = '#fff3cd'; // Temporary highlight
              setTimeout(() => { existingItem.style.backgroundColor = ''; }, 1000);
               // Clear status message after a delay
               setTimeout(() => {
                   if (isScanning) scanStatus.textContent = 'Point camera at barcode...';
                   else manualStatus.textContent = '';
                }, 2000);
             return;
         }

         // *** UPDATED innerHTML ***
        listItem.innerHTML = `
            <span>${barcode}</span>
            <span class="product-name">${product.name}</span>
            <span>${product.uom}</span>
            <span class="product-bincode">${product.bincode || 'N/A'}</span> <!-- Display BINCODE -->
            <!-- Removed Price Span -->
        `;
        scannedItemsList.prepend(listItem); // Add to top

        // Update status based on whether scanning or manual add
        if (isScanning) {
            scanStatus.textContent = `Scanned: ${product.name}`;
             setTimeout(() => { if (isScanning) scanStatus.textContent = 'Point camera at barcode...'; }, 2000);
        } else {
            // Manual add status is handled in handleManualAdd
        }
    }

    function clearList() {
        scannedItemsList.innerHTML = '';
        console.log('Displayed list cleared.');
    }

    // --- Scanning Logic ---
    async function startScan() {
        if (isScanning) return;
        if (Object.keys(productData).length === 0) {
            alert("No product data loaded. Please upload a CSV file first.");
            return;
        }

        codeReader = new ZXing.BrowserMultiFormatReader();
        isScanning = true;
        scanButton.disabled = true; // Keep scan button disabled while actively scanning
        manualAddButton.disabled = true; // Disable manual add while scanning
        stopScanButton.style.display = 'inline-block'; // Show stop button
        scannerContainer.style.display = 'block';
        scanStatus.textContent = 'Requesting camera access...';

        try {
            console.log('Attempting to decode from video device...');
            scanStatus.textContent = 'Starting scanner... Point camera at barcode.';

            codeReader.decodeFromVideoDevice(undefined, 'video', (result, err) => {
                if (result) {
                    const barcode = result.text;
                    console.log('Scan successful:', barcode);
                    const product = lookupBarcode(barcode);
                    if (product) {
                        displayItem(barcode, product);
                        navigator.vibrate?.(100);
                    } else {
                        console.log(`Barcode ${barcode} not found in data.`);
                        scanStatus.textContent = `Barcode ${barcode} not found.`;
                        setTimeout(() => { if (isScanning) scanStatus.textContent = 'Point camera at barcode...'; }, 2000);
                    }
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error('Scan error:', err);
                     if (err.name === 'NotAllowedError') {
                        scanStatus.textContent = 'Camera permission denied.';
                        alert('Camera permission was denied. Please allow camera access in your browser settings.');
                        stopScan();
                     } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                         scanStatus.textContent = 'No suitable camera found.';
                         alert('Could not find a suitable camera on this device.');
                         stopScan();
                     } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                          scanStatus.textContent = 'Camera is already in use or cannot be read.';
                          alert('Could not start the camera. It might be used by another application or browser tab.');
                          stopScan();
                     }
                     else {
                         scanStatus.textContent = 'Scanning error. Try again.';
                         alert(`An unexpected scanning error occurred: ${err.name}`);
                         stopScan();
                     }
                    setTimeout(() => { if (isScanning) scanStatus.textContent = 'Point camera at barcode...'; }, 3000);
                }
            });

            console.log(`Decode operation started successfully.`);

        } catch (error) {
            console.error('Error setting up scanner:', error);
            alert(`Error accessing camera or starting scan: ${error.message}`);
            scanStatus.textContent = 'Camera setup failed.';
            stopScan();
        }
    }

     function stopScan() {
        if (codeReader) {
            codeReader.reset();
            console.log('ZXing code reader reset.');
        }
        if (videoElement.srcObject) {
             videoElement.srcObject.getTracks().forEach(track => track.stop());
             videoElement.srcObject = null;
             console.log('Video tracks stopped.');
        }


        isScanning = false;
         // Re-enable buttons ONLY if data is loaded
        const dataLoaded = Object.keys(productData).length > 0;
        scanButton.disabled = !dataLoaded;
        manualAddButton.disabled = !dataLoaded;

        stopScanButton.style.display = 'none';
        scannerContainer.style.display = 'none';
        if (!scanStatus.textContent.includes('failed')) {
            scanStatus.textContent = 'Scanner stopped.';
        }
        console.log('Scanning stopped.');
    }

    // --- Manual Add Logic ---
    function handleManualAdd() {
        const barcodeValue = manualBarcode.value.trim();
        manualStatus.textContent = ''; // Clear previous status

        if (!barcodeValue) {
            manualStatus.textContent = 'Please enter a barcode.';
            manualStatus.style.color = 'orange';
            return;
        }

        if (Object.keys(productData).length === 0) {
            manualStatus.textContent = 'Product data not loaded.';
            manualStatus.style.color = 'red';
            return;
        }

        console.log(`Manual lookup for barcode: ${barcodeValue}`);
        const product = lookupBarcode(barcodeValue);

        if (product) {
            displayItem(barcodeValue, product); // Use existing display function
            manualBarcode.value = ''; // Clear input on success
            manualStatus.textContent = 'Added!';
            manualStatus.style.color = 'green';
        } else {
            console.log(`Manual barcode ${barcodeValue} not found.`);
            manualStatus.textContent = 'Barcode not found!';
            manualStatus.style.color = 'red';
        }
        // Clear status message after a delay
        setTimeout(() => { manualStatus.textContent = ''; }, 3000);
    }

    // --- PDF Export Logic ---
    function exportToPdf() {
        console.log("Export to PDF triggered.");
        const listItems = scannedItemsList.querySelectorAll('li');

        if (listItems.length === 0) {
            alert("The scanned items list is empty. Nothing to export.");
            console.log("Export aborted: List is empty.");
            return;
        }

        // Price visibility check removed

        // *** UPDATED tableHeaders ***
        const tableHeaders = ["Barcode", "Product Name", "UOM", "Bin Code"];
        const tableData = [];

        listItems.forEach(item => {
            const barcode = item.querySelector('span:nth-child(1)')?.textContent || '';
            const productInfo = productData[barcode]; // Re-lookup for more reliable data

            const name = productInfo?.name || item.querySelector('span.product-name')?.textContent || '';
            const uom = productInfo?.uom || item.querySelector('span:nth-child(3)')?.textContent || '';
            // *** Get BINCODE ***
            const bincode = productInfo?.bincode || item.querySelector('span.product-bincode')?.textContent || '';

            const rowData = [barcode, name, uom, bincode]; // Add bincode to row
            // Price data removal
            tableData.push(rowData);
        });

        tableData.reverse(); // Match list order (newest first)

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text("Scanned Product List", 14, 15);

            // *** UPDATED columnStyles ***
            let columnStyles = {
                 0: { cellWidth: 35 }, // Barcode
                 1: { cellWidth: 'auto'}, // Product Name
                 2: { cellWidth: 15 }, // UOM
                 3: { cellWidth: 25 }  // Bin Code - Adjust width as needed
            };
            // Price column style removal

            doc.autoTable({
                head: [tableHeaders],
                body: tableData,
                startY: 25,
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { fillColor: [22, 160, 133], fontSize: 9 },
                columnStyles: columnStyles
            });

            const now = new Date();
            const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
            const filename = `scanned_items_${timestamp}.pdf`;

            doc.save(filename);
            console.log(`PDF exported as ${filename}`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. Check the console.");
        }
    }


    // --- Event Listeners ---
    csvFileInput.addEventListener('change', handleFileSelect, false);
    scanButton.addEventListener('click', startScan);
    clearButton.addEventListener('click', clearList);
    stopScanButton.addEventListener('click', stopScan);
    manualAddButton.addEventListener('click', handleManualAdd);
    exportPdfButton.addEventListener('click', exportToPdf);
    // Price toggle event listener removed
    manualBarcode.addEventListener('keydown', (event) => {
        manualStatus.textContent = '';
        if (event.key === 'Enter') {
            event.preventDefault();
            handleManualAdd();
        }
    });

    // --- Initial Load ---
    loadDataFromLocalStorage();
    // applyPriceVisibilityPreference() removed

});
