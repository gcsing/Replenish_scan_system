/* ----- Updated code.js with integrated Code Summary points ----- */
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded. Initializing dashboard script."); // Log: Script start

    const interactionHub = document.getElementById('interaction-hub');
    const infoDisplay = document.getElementById('info-display');
    const searchInput = document.getElementById('search-input');
    if (!interactionHub) console.error("ERROR: interaction-hub not found!");
    if (!infoDisplay) console.error("ERROR: info-display not found!");
    if (!searchInput) console.warn("Warning: search-input not found (Search inactive).");

    const initialInfoPlaceholder = infoDisplay ? infoDisplay.innerHTML : '<p>Error: Info display area not found.</p>';

    const allNavButtons = interactionHub ? interactionHub.querySelectorAll('button') : [];
    console.log(`Found ${allNavButtons.length} buttons in interaction hub.`);

    // --- Rule Content Data ---
    const rulesData = {
        // --- BIKE RULES (EXISTING + NEW + MERGED) ---
        responsibility: {
            title: "🚴 Riding Responsibly",
            keywords: "responsible, predictable, considerate, patient, defensive, scan, hazard, eye contact, distracted, phone, alcohol, drugs, skills, training, bikeready",
            sections: [
                { heading: "Core Principles", content: "<p>As vehicles, cyclists must follow all road rules. Ride in a way that keeps you and others safe.</p><ul><li>Be <strong>Predictable:</strong> Ride in a consistent manner, signal intentions clearly.</li><li>Be <strong>Patient & Considerate:</strong> Share the road/path courteously with all users.</li><li>Be <strong>Visible:</strong> Use lights and bright/reflective gear, position yourself well.</li></ul>" },
                { heading: "Defensive Riding", content: "<p>Anticipate potential hazards and mistakes by others:</p><ul><li><strong>Scan</strong> constantly: Ahead, behind, sides, road surface.</li><li>Look for <strong>Hazards:</strong> Potholes, drains, car doors opening, pedestrians, turning vehicles.</li><li>Make <strong>Eye Contact</strong> with drivers/pedestrians where possible.</li><li>Be prepared to react and avoid crashes.</li></ul>" },
                { heading: "Avoid Distractions & Impairment", content: "<p>Focus on riding:</p><ul><li><strong>DO NOT</strong> use a mobile phone while riding.</li><li><strong>DO NOT</strong> ride under the influence of alcohol or drugs that impair your ability.</li></ul>" },
                { heading: "Improve Your Skills", content: "<p>Consider taking a cycle skills course to build confidence and learn techniques. Check out <a href='https://bikeready.govt.nz' target='_blank' rel='noopener noreferrer'>BikeReady.govt.nz <span class='external-link-icon'>↗</span></a>.</p>" }
            ],
            officialRule: "Source: NZ Code for Cyclists"
        },
        helmet: {
            title: "Wearing a Helmet ⛑️",
            keywords: "helmet, headgear, safety, standard, mandatory, passenger, exemption, sikh, fit, approved",
            sections: [
                { heading: "The Main Rule", content: "<p>You <strong>MUST</strong> wear an approved safety helmet, securely fastened, whenever riding a bicycle on a road.</p>" },
                { heading: "Who does this apply to?", content: "<ul><li>✅ The cyclist riding the bike</li><li>✅ Any passenger being carried (e.g., in a child seat or on a trailer towed by the bike)</li></ul>" },
                { heading: "Key Details", content: "<ul><li><strong>Approved Standards:</strong> Your helmet needs to meet specific safety standards (like <code>AS/NZS 2063</code>, <code>EN 1078</code> etc.). Check the sticker inside!</li><li><strong>Fit:</strong> Helmet should fit snugly, sit level on the head (not tilted back), and not move around excessively. Straps should form a 'V' under ears.</li><li><strong>Condition:</strong> Must be free from cracks, damage, or modifications. Replace after a significant impact.</li><li><strong>Fastened:</strong> The strap must be done up securely under your chin (1-2 fingers gap).</li></ul>" },
                { heading: "Exceptions", content: "<ul><li>If you have an official exemption certificate from the Director of Land Transport (e.g., for medical/physical reasons).</li><li>If you are an adherent of the Sikh faith AND riding at a speed <strong>NOT</strong> exceeding 50 km/h.</li></ul>" }
            ],
            officialRule: "Clause 11.8 & Code Summary"
        },
        lights: {
            title: "Lights & Visibility 💡",
            keywords: "lights, lighting, night, dark, visibility, reflectors, reflective, sunset, sunrise, 100m, 200m, dazzle",
            sections: [
                { heading: "When Lights are Required", content: "<p>You <strong>MUST</strong> use required lights and reflectors when riding:</p><ul><li>Between 30 minutes after sunset and 30 minutes before sunrise (at night).</li><li>At any other time when visibility is poor (e.g., heavy rain, fog) and you can't easily see a person or vehicle 100m away.</li></ul>" },
                { heading: "Required Equipment", content: "<ul><li><strong>Front:</strong> One or two steady or flashing white or yellow headlamps. Must be visible from <strong>100m</strong> (Rule) / <strong>200m</strong> (Code Recommendation).</li><li><strong>Rear:</strong> At least one steady or flashing red rear-facing light. Must be visible from <strong>100m</strong> (Rule) / <strong>200m</strong> (Code Recommendation).</li><li><strong>Rear Reflector:</strong> At least one red rear reflector (visible from 100m).</li><li><strong>Pedals:</strong> Yellow pedal reflectors on the front and back of each pedal, <strong>UNLESS</strong> you are wearing reflective material (e.g., vest, stripes, ankle bands) OR have reflective strips on wheels/tyres.</li></ul><p>Lights must not dazzle, confuse, or distract other road users.</p>" }
            ],
            officialRule: "Clause 11.12 & Code Summary"
        },
         signalling: {
            title: "Hand Signalling 👋",
            keywords: "signal, signalling, hand, arm, turning, stopping, changing lane, 3 seconds, intention, check",
            sections: [
                { heading: "When to Signal", content: "<p>You <strong>MUST</strong> signal clearly for <strong>at least 3 seconds</strong> before you:</p><ul><li>Turn left or right.</li><li>Move sideways (e.g., change lane position, pull out to pass).</li><li>Stop or slow down suddenly (if possible).</li></ul>" },
                { heading: "How to Signal", content: "<ul><li><strong>Turning Left:</strong> Extend your left arm horizontally outwards.</li><li><strong>Turning Right:</strong> Extend your right arm horizontally outwards.</li><li><strong>Stopping/Slowing:</strong> Extend your right arm bent upwards at the elbow, OR extend your right arm horizontally with the palm facing backwards (less common).</li></ul>" },
                { heading: "Important Considerations", content: "<ul><li><strong>Check Behind:</strong> Always glance behind you to check for traffic before signalling and maneuvering.</li><li><strong>Safety First:</strong> You do not need to signal if doing so would compromise your control of the bike (e.g., during heavy braking or on a very rough surface). Maintain control first.</li><li><strong>Clear & Definite:</strong> Make your signals obvious to other road users.</li></ul>" }
            ],
            officialRule: "Clause 3.10 & Code Summary"
        },
         positioning: {
            title: "Road Positioning & Passing 🛣️",
            keywords: "positioning, lane position, take the lane, primary position, secondary position, sharrow, passing, overtaking, left, centre, kerb, gutter, parked cars, door zone, trucks, buses, blind spot",
            sections: [
                { heading: "Keeping Left (Secondary Position)", content: "<p>Generally, keep reasonably left ('secondary position'), but <strong>NOT</strong> in the gutter or too close to the kerb where drains, debris, or uneven surfaces exist. Aim for about 1m out from the kerb or edge line when safe.</p><p>Ride predictably in a straight line, avoiding unnecessary weaving.</p>" },
                { heading: "Taking the Lane (Primary Position)", content: "<p>Move towards the centre of your lane ('primary position' or 'taking the lane') when necessary for safety and visibility:</p><ul><li>To avoid hazards (potholes, drains, rough surfaces).</li><li>To avoid the 'door zone' of parked cars (stay at least 1m-1.5m away).</li><li>When approaching intersections, especially when turning right.</li><li>On narrow roads where safe overtaking by cars is not possible.</li><li>At roundabouts.</li><li>To discourage unsafe overtaking.</li><li>Where <strong>Sharrows</strong> (bike symbol with chevrons) are marked – these indicate cyclists may use the full lane.</li></ul><p>Be assertive but courteous when taking the lane. Check behind and signal if moving significantly.</p>" },
                { heading: "Passing Other Vehicles", content: "<ul><li>Generally pass other vehicles (moving or stationary) on their <strong>right</strong>.</li><li><strong>Exceptions (Passing on Left):</strong> You may pass on the left ONLY IF:<ul><li>You are in a marked lane separate from the vehicle (e.g., a cycle lane).</li><li>The vehicle is stopped or signalling to turn right.</li><li>The vehicle is stationary in traffic.</li></ul></li><li><strong>Extreme Caution:</strong> Be very careful passing slow or stopped traffic, especially large vehicles like trucks and buses. Watch for:<ul><li>Vehicles turning left across your path (HUGE blind spots on trucks/buses – AVOID passing on their left if they might turn!).</li><li>Car doors opening.</li><li>Pedestrians crossing between vehicles.</li></ul></li></ul>" },
                 { heading: "Passing Cyclists & Pedestrians", content: "<p>When passing other cyclists or pedestrians (e.g., on shared paths):</p><ul><li>Pass on the right where possible and safe.</li><li>Allow plenty of space (at least <strong>1m - 1.5m</strong> if possible).</li><li>Ring your bell or call out politely well in advance ('Passing on your right!').</li><li>Slow down if necessary.</li></ul>" }
            ],
            officialRule: "Clauses 2.1, 2.8, 2.9 & Code Summary"
        },
        ridingwithothers: {
            title: "Riding with Others 🧑‍🤝‍🧑",
            keywords: "side-by-side, two abreast, single file, bunch cycling, group, passing, supervising children",
            sections: [
                { heading: "Riding Side-by-Side", content: "<p>You are permitted to ride <strong>no more than two abreast</strong> (side-by-side) on a road.</p><ul><li>However, you <strong>MUST NOT</strong> ride side-by-side if doing so would unreasonably impede the normal flow of traffic.</li><li>Ride <strong>single file</strong> in situations like:<ul><li>Narrow roads or lanes.</li><li>Busy traffic conditions.</li><li>Steep hills or sharp bends.</li><li>Poor visibility.</li></ul></li></ul>" },
                { heading: "Passing Other Cyclists in Group", content: "<p>If riding in the same lane, pass other cyclists only on their right.</p>" },
                { heading: "Bunch Cycling", content: "<p>Riding in larger organised groups ('bunches') requires specific skills, communication, and etiquette. Follow established group riding practices if participating.</p>" },
                { heading: "Supervising Children", content: "<p>Keep children under close supervision when cycling near roads or traffic. Teach them safe riding habits.</p>" }
            ],
            officialRule: "Clause 11.10 & Code Summary"
        },
        footpath: {
            title: "Riding on Footpaths 🚶‍♀️🚲",
            keywords: "footpath, pavement, sidewalk, walking, pedestrians, riding, parking, small wheels, mail delivery",
            sections: [
                { heading: "General Rule", content: "<p>You <strong>MUST NOT</strong> ride a standard bicycle on a footpath.</p>" },
                { heading: "Exceptions", content: "<ul><li>If you are delivering newspapers, mail, or similar printed material to letterboxes (Rule 11.11).</li><li>If the bicycle has wheels with a diameter of <strong>355mm (14 inches) or less</strong> (typically small children's bikes) (Code Summary).</li></ul>" },
                { heading: "Parking on Footpaths", content: "<p>Generally <strong>NO</strong>, unless signs, markings, or official bike racks allow it. However, you can park carefully if you don't unreasonably block pedestrians or mobility devices (Rule 6.14).</p>" },
                { heading: "Important Distinction", content: "<p>This is different from 'Shared Paths' where cycling is usually permitted. Check local signs!</p>" }
            ],
            officialRule: "Clauses 11.11, 6.14 & Code Summary"
        },
        cyclelanes: {
            title: "Using Cycle Lanes & Other Lanes ↔️",
            keywords: "cycle lane, bike lane, road marking, roadway, motor vehicle, driving, parking, green lane, bus lane, bus only lane, transit lane, T2, T3",
            sections: [
                { heading: "Cycle Lanes", content: "<p>A cycle lane is part of the roadway marked with lines and cycle symbols (often painted green) specifically for cyclists.</p><ul><li>If a cycle lane is provided, you should generally use it where practicable.</li><li>Ride entirely within the lane markings.</li><li>Motor vehicles <strong>MUST NOT</strong> drive or park in a cycle lane, except for short distances (max 50m) when entering/leaving driveways, side roads, or parking spaces, AND only if they give way to cyclists (<code>Rule 2.3</code>).</li><li>Motor vehicles <strong>MUST NOT</strong> enter a cycle lane approaching an intersection if blocked by stationary traffic (<code>Rule 4.5(3)</code>).</li></ul>" },
                { heading: "Bus Lanes", content: "<p>Lanes marked 'BUS LANE'. Cyclists <strong>ARE generally permitted</strong> to use standard bus lanes. Always check accompanying signs for any specific restrictions.</p>" },
                { heading: "Bus ONLY Lanes", content: "<p>Lanes marked 'BUS ONLY'. Cyclists <strong>ARE NOT permitted</strong> to use these lanes. Check signs carefully.</p>" },
                { heading: "Transit Lanes (T2 / T3)", content: "<p>Lanes marked 'T2' (vehicles with 2+ people) or 'T3' (vehicles with 3+ people). Cyclists <strong>ARE permitted</strong> to use transit lanes, even when riding solo. Check signs.</p>" }
            ],
            officialRule: "Clauses 1.6 (Definitions), 2.3, 4.5 & Code Summary"
        },
        sharedpath: {
            title: "Shared Paths 🌳",
            keywords: "shared path, cycle path, footpath, pedestrians, walking, riding, giving way, considerate, bell, space, slow",
            sections: [
                { heading: "What are they?", content: "<p>Paths designated for use by multiple types of users at the same time (e.g., cyclists, pedestrians, mobility scooters). Can be cycle paths, footpaths, or other paths. Look for signs!</p>"},
                { heading: "How to Use", content: "<ul><li>Ride slowly and carefully, prepared to stop.</li><li>Be considerate of all other users.</li><li>Give pedestrians plenty of space (at least <strong>1m - 1.5m</strong> when passing).</li><li>Use your bell or call out politely ('Passing on your right!') well in advance when approaching others from behind.</li><li><strong>DO NOT</strong> operate your bike at a speed that is hazardous to others.</li><li><strong>DO NOT</strong> use it in a manner that is a hazard to others.</li></ul>"},
                { heading: "Priority", content: "<p>Follow any signs or markings that indicate priority (e.g., 'Pedestrians have priority'). If priority is marked:</p><ul><li>Users without priority <strong>MUST</strong> give way.</li><li>Even with priority, <strong>DO NOT</strong> unduly impede other users.</li></ul>"},
            ],
            officialRule: "Clause 11.1A & Code Summary"
        },
         intersections: {
            title: "Navigating Intersections 🚦",
            keywords: "intersection, junction, turning, turn right, turn left, hook turn, traffic lights, signals, giving way, roundabout, stop, give way, filter, queue, advanced stop box, detector, loop, yellow light, red light, bike signal",
            sections: [
                { heading: "Approaching", content: "<p>Scan well ahead, check behind, decide your path early. Signal intentions clearly for 3+ seconds. Move into the correct lane or position (e.g., 'take the lane' if turning right or going straight from a central lane).</p>" },
                { heading: "Turning Right (Standard)", content: "<p>Signal right, check behind, move towards the centre line (safely, don't cross solid yellow), give way to oncoming traffic (including those turning left), turn when clear. (<code>Rule 2.5</code> & Code)</p>" },
                { heading: "Turning Right (Hook Turn)", content: "<p>A safer option at busy intersections:</p><ol><li>Stay far left through the intersection.</li><li>Ride straight across.</li><li>Stop on the far left corner of the destination road (look for marked box/signs).</li><li>Turn bike to face new direction.</li><li>Wait for green signal / clear traffic on the road you just crossed, then proceed.</li></ol><p> (<code>Rule 2.5A</code> & Code)</p>" },
                { heading: "Turning Left", content: "<p>Signal left, check behind, stay near the left kerb, turn when safe. Give way to pedestrians crossing the road you are entering. (<code>Rule 2.5</code> & Code)</p>" },
                { heading: "Traffic Lights", content: "<ul><li><strong>Green:</strong> Proceed if safe.</li><li><strong>Yellow (Amber):</strong> <strong>STOP</strong> before the line, unless you are so close that stopping would be unsafe.</li><li><strong>Red:</strong> <strong>STOP</strong> behind the stop line or advanced stop line.</li><li><strong>Flashing Red:</strong> Treat as a Stop sign (e.g., at level crossings).</li><li><strong>Bike Signals:</strong> Obey specific green/red bike symbols if present.</li><li><strong>Filtering & Advanced Stop Boxes:</strong> You may cautiously filter past stopped or slow traffic to reach an Advanced Stop Box (painted area at front) or wait at the front of the queue. Be aware of turning vehicles. Motor vehicles MUST NOT stop in the box.</li><li><strong>Detectors:</strong> Look for loops (cuts in road) or diamonds near the stop line. Position your bike over them to trigger the lights. Use pedestrian button if not detected.</li></ul>(<code>Part 3</code> & Code)" },
                { heading: "Roundabouts", content: "<p>Give way to traffic already on the roundabout (approaching from your right). Consider 'taking the lane' (riding centre) for visibility. Use appropriate lanes if marked. Signal left when exiting if practicable. At complex/high-speed roundabouts, consider dismounting and walking if unsure. (<code>Rule 4.6, 3.10</code> & Code)</p>" },
                 { heading: "Blocked Intersections", content: "<p><strong>DO NOT</strong> enter an intersection or pedestrian crossing (even on green) if your path through or out of it is blocked by stationary traffic. (<code>Rule 4.5, 10.1</code>)</p>" }
            ],
            officialRule: "Clauses 2.5, 2.5A, Part 3, 4.5, 4.6, 10.1, 3.10 & Code Summary"
        },
        giveway: {
            title: "Giving Way Rules ✋",
            keywords: "give way, yield, priority, stop sign, give way sign, intersection, driveway, roundabout, pedestrian crossing, traffic lights, turning, t-intersection, uncontrolled, prepare to stop",
            sections: [
                 { heading: "Core Principle", content:"<p>Always be prepared to stop or slow down, even if you technically have the right of way. Anticipate others' actions.</p>"},
                { heading: "Stop & Give Way Signs", content: "<p>At a <code>STOP</code> sign: Come to a <strong>complete stop</strong> behind the line. Give way to all conflicting traffic before proceeding. At a <code>GIVE WAY</code> sign: Slow down (stop if needed). Give way to all conflicting traffic (unless they have a Stop sign) before proceeding. (<code>Rule 4.1</code> & Code)</p>" },
                { heading: "Uncontrolled Intersections (No Signs/Signals)", content: "<p>Give way to all vehicles approaching from your <strong>right</strong>. (<code>Rule 4.2</code> & Code)</p>" },
                { heading: "T-Intersections", content: "<p>If you are on the terminating road (bottom of the 'T'), you <strong>MUST</strong> give way to all vehicles on the continuing road (top of the 'T'). (Code & Rule 4.2 implicitly)</p>" },
                { heading: "Turning Traffic", content: "<p>When turning right, give way to oncoming vehicles going straight or turning left. When turning (left or right), give way to pedestrians crossing the road you are entering. (<code>Rule 4.2</code> & Code)</p>" },
                { heading: "Driveways", content: "<p>Entering/Exiting: Give way to pedestrians & vehicles on footpath/cycle path/shared path. Exiting: Also give way to vehicles on the roadway. (<code>Rule 4.4</code>)</p>" },
                { heading: "Roundabouts", content: "<p>Give way to all vehicles already circulating (approaching from your right). (<code>Rule 4.6</code> & Code)</p>" },
                { heading: "Pedestrian Crossings", content: "<p>Give way to pedestrians on or clearly waiting to use a marked crossing (zebra). <strong>DO NOT</strong> overtake a vehicle stopped at a crossing. See 'Crossings' topic for more detail. (<code>Rule 10.1</code> & Code)</p>" }
                // Removed Emergency Vehicles here, less common give way scenario for quick guide
            ],
            officialRule: "Part 4, Clause 10.1 & Code Summary"
        },
         crossings: {
            title: "Navigating Crossings 🚶‍♂️🚦",
            keywords: "crossing, pedestrian, zebra, kea, school patrol, courtesy, shared crossing, cycle crossing, rail, train, tracks, lights, signals",
            sections: [
                { heading: "Pedestrian (Zebra) Crossings", content: "<p>Marked with black and white stripes and often yellow beacons. <strong>You MUST give way to pedestrians ON or clearly waiting to cross.</strong> It's recommended cyclists dismount and walk across, but legally you can ride carefully if clear (treat as normal road). <strong>DO NOT</strong> overtake vehicles stopped at a zebra crossing.</p>" },
                { heading: "Kea (School Patrol) Crossings", content: "<p>Usually near schools, operate during set times. <strong>You MUST STOP</strong> when the fluorescent 'STOP' signs are held out by patrols. Wait until signs are withdrawn.</p>" },
                { heading: "Courtesy Crossings", content: "<p>Often raised platforms with different coloured paving. <strong>These are NOT official pedestrian crossings.</strong> Vehicles (including bikes) do not legally have to stop. Be cautious, slow down, check for vehicles, and give way to pedestrians if safe and courteous to do so.</p>" },
                { heading: "Shared Crossings", content: "<p>Marked area (often green or with bike/pedestrian symbols) alongside traffic signals, allowing cyclists and pedestrians to cross together. <strong>Cyclists CAN RIDE across.</strong> Obey the traffic signals (pedestrian or cycle symbols). Give way to pedestrians on the crossing.</p>" },
                { heading: "Cycle Crossings", content: "<p>Marked area (often green with bike symbols) alongside traffic signals, specifically for cyclists. <strong>Ride across when the CYCLE signal shows green.</strong> Obey cycle signals, not necessarily main traffic lights.</p>" },
                { heading: "Rail (Level) Crossings", content: "<p><strong>STOP</strong> if bells are ringing, lights are flashing, or barriers are down/lowering. Cross only when safe. Cross tracks <strong>as close to a right angle (90°) as possible</strong> to prevent your wheels from slipping or getting caught in the gap. Be especially careful in wet conditions.</p>" }
            ],
            officialRule: "Clause 10.1, Part 3 & Code Summary"
        },
         signsmarkings: {
            title: "Signs & Markings 🪧",
            keywords: "signs, markings, compulsory, regulatory, warning, information, guide, sharrow, hook turn box, advanced stop box, lines, yellow, white, centre line, edge line, no passing",
            sections: [
                { heading: "Types of Signs", content: "<ul><li><strong>Compulsory/Regulatory Signs:</strong> Usually round with red border (prohibitive like 'No Entry') or blue background (mandatory like 'Keep Left'). <strong>You MUST obey these.</strong> Examples: Stop, Give Way, Speed Limit, Turn restrictions.</li><li><strong>Warning Signs:</strong> Usually diamond shape, black symbol on yellow background. Alert you to potential hazards. Examples: Curves, Slippery Road, Pedestrians Ahead, Steep Hill, Road Works. Take extra care.</li><li><strong>Information/Guide Signs:</strong> Usually rectangular, various colours (blue, green, white). Provide directions, distances, facility locations. Examples: Cycle route numbers, directions to towns, 'Shared Path' signs, Hook Turn instructions.</li></ul>" },
                { heading: "Key Road Markings", content: "<ul><li><strong>Centre Lines:</strong> Separate opposing traffic.<ul><li><em>Single Broken White:</em> Pass if clear.</li><li><em>Single Solid Yellow:</em> DO NOT pass if line is on your side.</li><li><em>Double Solid Yellow:</em> DO NOT pass from either side.</li><li><em>Broken Yellow beside Solid Yellow:</em> Pass ONLY if broken line is on your side AND safe.</li></ul></li><li><strong>Lane Lines:</strong> Broken white lines separate lanes going in the same direction.</li><li><strong>Edge Lines:</strong> Solid white lines often mark the left edge of the roadway.</li><li><strong>Sharrows:</strong> Bike symbol with chevrons. Indicates a shared lane where cyclists are expected to 'take the lane'. Alerts drivers to expect cyclists in the main traffic flow.</li><li><strong>Hook Turn Box:</strong> Marked rectangle showing where to wait when performing a hook turn.</li><li><strong>Advanced Stop Box:</strong> Marked rectangle at traffic lights for cyclists to wait ahead of other vehicles.</li><li><strong>Limit Lines:</strong> Solid white line(s) indicating where to stop at intersections/crossings.</li></ul>" }
            ],
            officialRule: "Land Transport Rule: Traffic Control Devices 2004 & Code Summary"
        },
        parking: {
            title: "Parking Your Bike 🅿️",
            keywords: "parking, park, stopping, stand, footpath, parallel, angle, pedestrian crossing, cycle lane, obstruct",
            sections: [
                { heading: "General Care", content: "<p>Park with care and consideration for other road users. <strong>DO NOT</strong> park where you obstruct traffic or pedestrians unreasonably. (<code>Rule 6.1</code>)</p>" },
                { heading: "On Footpaths/Cycle Paths", content: "<p>Generally <strong>NO</strong>, unless signs/markings or official bike racks allow it. You can park carefully if not unreasonably blocking others, especially mobility device users. (<code>Rule 6.14</code>)</p>" },
                { heading: "Near Pedestrian Crossings", content: "<p>Rules against parking close to pedestrian crossings generally <strong>DO NOT</strong> apply to bicycles, but still park considerately away from the crossing itself. (<code>Rule 6.5(3)</code>)</p>" },
                { heading: "Parallel vs Angle", content: "<p>Rules requiring parallel parking or specific angle parking for motor vehicles generally <strong>DO NOT</strong> apply to bicycles. Park safely and appropriately for the space. (<code>Rule 6.12, 6.13</code>)</p>"},
                { heading: "In Cycle Lanes", content: "<p>You <strong>MUST NOT</strong> park in a cycle lane (unless specific signs permit, which is rare). (<code>Rule 6.6 related</code>)</p>"}
            ],
            officialRule: "Part 6 (esp. 6.1, 6.5, 6.12, 6.13, 6.14)"
        },
        passengers: {
            title: "Carrying Passengers 🧑‍🤝‍🧑",
            keywords: "passenger, carrying, child seat, infant, pillion, trailer, helmet",
            sections: [
                { heading: "General Rule", content: "<p>You can only carry a passenger on a cycle if specific conditions are met.</p>"},
                { heading: "Requirements", content: "<ul><li>The passenger must be on a proper pillion seat designed for passengers, AND have dedicated footrests which they use, OR</li><li>If the passenger is an infant, they must be in an approved child seat/container that protects their legs from the wheels.</li></ul>"},
                { heading: "Helmets Required", content: "<p>Any passenger you carry <strong>MUST</strong> also wear an approved, securely fastened helmet (same rules as the rider). (<code>Rule 11.8</code> & Code)</p>"},
                { heading: "Passengers on Trailers", content:"<p>If towing a trailer designed for people, any person carried in the trailer <strong>MUST</strong> also wear an approved, securely fastened helmet. (<code>Rule 11.8(5)</code>)</p>"}
            ],
            officialRule: "Clauses 11.7, 11.8 & Code Summary"
        },
        towing: {
            title: "Towing Things 🔗",
            keywords: "towing, trailer, pulling",
            sections: [
                { heading: "What Can You Tow?", content: "<p>You <strong>CAN</strong> tow a dedicated bicycle trailer.</p>" },
                { heading: "What You CANNOT Tow", content: "<p>You <strong>MUST NOT</strong> tow any other type of vehicle (e.g., another bike, a skateboard). (<code>Rule 11.9(1)</code>)</p>" },
                { heading: "Being Towed", content: "<p>You <strong>MUST NOT</strong> allow your bicycle to be towed by another vehicle (e.g., holding onto a car). (<code>Rule 11.9(2)</code>)</p>" },
                { heading: "Passengers in Trailers", content:"<p>Remember: Passengers in towed trailers need approved helmets! (See 'Carrying Passengers' topic).</p>"}
            ],
            officialRule: "Clause 11.9, 11.8(5)"
        },
        definitions: {
            title: "Key Definitions 📜",
            keywords: "definition, meaning, glossary, cycle, power-assisted, e-bike, cycle lane, cycle path, shared path, roadway, footpath, hook turn, sharrow, advanced stop box, bus lane, bus only lane, transit lane, crossing, intersection",
            sections: [
                { heading: "Vehicle Types", content: "<ul><li><strong>Cycle:</strong> A vehicle with 2+ wheels, propelled mainly by human muscular energy. Includes power-assisted cycles. (<code>Rule 1.6</code>)</li><li><strong>Power-Assisted Cycle (E-bike):</strong> A cycle with an auxiliary electric motor(s) with max combined power output <strong>not exceeding 300 Watts</strong>. Treated as a 'cycle' for road rules. (<code>Rule 1.6</code>)</li></ul>" },
                 { heading: "Road Sections", content: "<ul><li><strong>Roadway:</strong> The part of the road used or reasonably usable by vehicles in general (usually excludes footpaths/margins). (<code>Rule 1.6</code>)</li><li><strong>Footpath:</strong> A path principally designed for pedestrians. Cycling generally prohibited (see 'Footpath' topic). (<code>Rule 1.6</code>)</li><li><strong>Cycle Lane:</strong> A marked lane on the roadway specifically for cycles. (<code>Rule 1.6</code>)</li><li><strong>Cycle Path:</strong> A path intended for cyclists, physically separated from the roadway (may sometimes be shared). (<code>Rule 1.6</code>)</li><li><strong>Shared Path:</strong> A path designated for use by multiple user types (e.g., cyclists, pedestrians). Special rules apply (see 'Shared Path' topic). (<code>Rule 11.1A</code> & Code)</li><li><strong>Bus Lane:</strong> Lane restricted primarily to buses; cyclists usually permitted. (Code)</li><li><strong>Bus-Only Lane:</strong> Lane restricted ONLY to buses; cyclists NOT permitted. (Code)</li><li><strong>Transit Lane (T2/T3):</strong> Lane for vehicles with multiple occupants; cyclists permitted solo. (Code)</li></ul>" },
                { heading: "Manoeuvres & Markings", content: "<ul><li><strong>Intersection:</strong> Where two or more roads cross or join.</li><li><strong>Hook Turn:</strong> A specific two-stage right turn for cyclists. (<code>Rule 2.5A</code> & Code)</li><li><strong>Sharrow:</strong> Road marking (bike + chevrons) indicating a shared lane where cyclists may 'take the lane'. (Code)</li><li><strong>Advanced Stop Box/Line:</strong> Marked area at traffic lights allowing cyclists to wait ahead of other vehicles. (Code)</li><li><strong>Crossing:</strong> A marked place for pedestrians or cyclists to cross the road (various types exist - see 'Crossings' topic).</li></ul>" }
            ],
            officialRule: "Clauses 1.6, 2.5A, 11.1A & Code Summary"
        },

        // --- OTHER Resources ---
        buyersguide: { title: "Bike Buyer's Guide 🛒", keywords: "buy, buyer, guide, new, used, second-hand, bike, bicycle, size, check, safety, inspect, frame, drivetrain, checklist, price, shop, market, online", sections: [ { heading: "Why Cycle?", content: "<p>Cycling in NZ is Faster, keeps you Fitter, is Cleaner for the environment, often Cheaper, and Fun!</p>" }, { heading: "1. Choosing the Right Type", content: "<ul><li><strong>Consider:</strong> Where will you ride (road, trail, commute)? How often? Any health factors?</li><li><strong>Need Help?</strong> Visit a local bike shop for expert advice.</li></ul>" }, { heading: "2. Getting the Right Size", content: "<ul><li><strong>Why it Matters:</strong> Comfort equals enjoyment and safety.</li><li><strong>Factors:</strong> Frame size, seat height, handlebars, wheel size.</li><li><strong>Need Help?</strong> A bike shop can ensure a perfect fit and setup.</li></ul>" }, { heading: "3. Buying Used - Safely", content: "<ul><li><strong>Where to Look:</strong> Markets, pawnshops, garage sales, police auctions, online (e.g., Trade Me for research).</li><li><strong>Price Check:</strong> Compare the model, age, and condition to similar bikes. Factor in potential repair costs.</li></ul>" }, { heading: "4. Checking a Used Bike (Key Safety Steps)", content: "<ul><li><strong>Expert Opinion:</strong> If unsure, take it to a bike shop <strong>before</strong> buying.</li><li><strong>Frame:</strong> Check for cracks (esp. welds) or major dents. Avoid! Check fork for wobbles.</li><li><strong>Drivetrain (Gears/Chain):</strong> Wiggle pedals side-to-side (no play). Spin pedals (no clunks/grinding). Shift gears (smooth?). Check derailleur hanger (no bends/cracks).</li><li><strong>Use a Checklist:</strong> Systematically inspect Handlebars, Pedals, Chain Set, Wheels/Tyres, Chain, Gears, Seat, and critically, <strong>Brakes</strong> (must stop instantly!). Refer to resources like the BIANZ checklist in the full guide.</li></ul>" }, { heading: "5. Bike Parts", content: "<p>Knowing basic parts (Seat, Wheels, Brakes, Gears, Frame etc.) helps with buying and maintenance.</p>" } ], officialRule: "Source: Based on NZ Transport Agency (Waka Kotahi) Bike Buyer's Guide" },
        cyclingcode: { title: "NZ Code for Cycling (Official PDF) 📜", keywords: "code, road code, official guide, pdf, rules, learn, new zealand, nzta", url: "https://nzta.govt.nz/assets/Road-code/Cycle-code/Cycling-code-2020.pdf", sections: [ { heading: "Official NZTA Resource", content: "<p>This link directs you to the official 'New Zealand Code for Cyclists' provided by Waka Kotahi NZ Transport Agency. It's the comprehensive guide covering rules, safety tips, and best practices.</p>" + "<p><a href='https://nzta.govt.nz/assets/Road-code/Cycle-code/Cycling-code-2020.pdf' target='_blank' rel='noopener noreferrer'><strong>Open the NZ Code for Cycling (PDF) <span class='external-link-icon'>↗</span></strong></a></p>" + "<p><em>(This link will open in a new browser tab.)</em></p>" } ], officialRule: "Source: Waka Kotahi NZ Transport Agency" },
        safetystandard: { title: "Bike Safety Standards (New Bikes) 🛡️", keywords: "standard, safety, new, pedal, bike, bicycle, AS/NZS, 1927, commerce commission, requirement, label, manual, seller, fair trading act, regulation", url: "https://comcom.govt.nz/__data/assets/pdf_file/0020/59402/Product-safety-standards-Pedal-bicycles-Fact-sheet-August-2019.pdf", sections: [ { heading: "Purpose", content: "<p>Official safety standards exist to prevent injuries from unsafe <strong>NEW</strong> pedal bicycles sold in NZ. Selling non-compliant new bikes is illegal under the Fair Trading Act.</p>" }, { heading: "What's Covered?", content: "<ul><li>Most <strong>NEW</strong> pedal bikes (human effort only).</li><li>Includes most kids' bikes (wheelbase 640mm+).</li><li>Partially assembled bikes ('bike in a box').</li></ul>" }, { heading: "What's NOT Covered?", content: "<ul><li>❌ Electric bikes (e-bikes)</li><li>❌ Second-hand bikes</li><li>❌ Small kids' bikes (wheelbase < 640mm)</li><li>❌ Custom-made / Competition / Recumbent bikes</li></ul>" }, { heading: "Key Requirements for New Bikes", content: "<ul><li>Based on standard <code>AS/NZS 1927:1998</code>.</li><li><strong>Safe Design:</strong> No sharp edges, secure parts.</li><li><strong>Performance:</strong> Good brakes (front & back), stable steering, required reflectors.</li><li><strong>Labels:</strong> Supplier info on frame, warnings for partial assembly or stunt 'look-alikes'.</li><li><strong>Manual:</strong> Must include an owner's manual (assembly, use, maintenance).</li></ul>" }, { heading: "Seller Responsibility", content: "<p>Retailers (shops, online sellers) are also responsible for ensuring the new bikes they sell meet the standard.</p>" }, { heading: "Second-Hand Bikes Advice", content: "<p>While the standard doesn't legally apply to used bikes, it's <strong>highly recommended</strong> to get them safety-checked by a qualified mechanic before selling or buying.</p>" }, { heading: "More Information", content: "<p>This information is based on the Commerce Commission Fact Sheet.</p>" + "<p><a href='https://comcom.govt.nz/__data/assets/pdf_file/0020/59402/Product-safety-standards-Pedal-bicycles-Fact-sheet-August-2019.pdf' target='_blank' rel='noopener noreferrer'><strong>View the Full Fact Sheet (PDF) <span class='external-link-icon'>↗</span></strong></a></p>" + "<p><em>(This link will open in a new browser tab.)</em></p>" } ], officialRule: "Source: Commerce Commission NZ Fact Sheet (Aug 2019)" }
     };

    // --- Function to Set Active Button ---
    function setActiveButton(activeButton) {
        allNavButtons.forEach(btn => btn.classList.remove('active'));
        if (activeButton && interactionHub && interactionHub.contains(activeButton)) {
             activeButton.classList.add('active');
        }
    }

    // --- Function to display rule info ---
    function displayRuleInfo(topic, clickedButton = null) {
        console.log(`>>> displayRuleInfo called for topic: ${topic}, clickedButton:`, clickedButton);

        if (!infoDisplay) {
            console.error("ERROR: infoDisplay element not found in displayRuleInfo.");
            return;
        }

        const ruleInfo = rulesData[topic];

        if (ruleInfo) {
            console.log(`   Found rule data for ${topic}:`, ruleInfo);
            // Handle topics that are just external links (check for URL and minimal content)
            if (ruleInfo.url && ruleInfo.sections && ruleInfo.sections.length === 1 && ruleInfo.sections[0].content.includes('href=')) {
                 // If it looks like just a link description, try opening it
                 // Find the actual link within the content to open
                 const linkMatch = ruleInfo.sections[0].content.match(/href=["'](.*?)["']/);
                 if(linkMatch && linkMatch[1]) {
                    window.open(linkMatch[1], '_blank');
                    console.log(`   Opened external link: ${linkMatch[1]}`);
                 }
                 // Display the info as normal (which contains the link text)
                 let htmlContent = `<h3>${ruleInfo.title}</h3>`;
                  ruleInfo.sections.forEach(section => {
                      htmlContent += `<div class="rule-section">`;
                      if (section.heading) htmlContent += `<h4>${section.heading}</h4>`;
                      htmlContent += section.content;
                      htmlContent += `</div>`;
                  });
                  if (ruleInfo.officialRule) {
                      htmlContent += `<p class="official-rule">${ruleInfo.officialRule}</p>`;
                  }
                  infoDisplay.innerHTML = htmlContent;

            } else {
                 // Standard display for internal content
                 let htmlContent = `<h3>${ruleInfo.title}</h3>`;
                 ruleInfo.sections.forEach(section => {
                     htmlContent += `<div class="rule-section">`;
                     if (section.heading) htmlContent += `<h4>${section.heading}</h4>`;
                     htmlContent += section.content;
                     htmlContent += `</div>`;
                 });
                 if (ruleInfo.officialRule) {
                      if(ruleInfo.officialRule.startsWith("Source:")) {
                         htmlContent += `<p class="official-rule">${ruleInfo.officialRule}</p>`;
                      } else {
                         htmlContent += `<p class="official-rule">Reference: Land Transport (Road User) Rule 2004 - ${ruleInfo.officialRule}</p>`;
                      }
                 }
                 infoDisplay.innerHTML = htmlContent;
                 console.log(`   Successfully displayed info for: ${topic}`);
            }

            const buttonToActivate = clickedButton || (interactionHub ? interactionHub.querySelector(`button[data-topic="${topic}"]`) : null);
            setActiveButton(buttonToActivate);

        } else {
            infoDisplay.innerHTML = `<div class="info-placeholder"><p>Information for '${topic}' could not be displayed. Data missing.</p></div>`;
            setActiveButton(null);
            console.error(`   Rule data NOT FOUND for topic: ${topic}`);
        }
    }

    // --- Function to display search results ---
    function displaySearchResults(results) {
         console.log(">>> displaySearchResults called with results:", results);
         if (!infoDisplay) { console.error("ERROR: infoDisplay element not found in displaySearchResults."); return; }

         setActiveButton(null);

         if (results.length === 0) {
             infoDisplay.innerHTML = `<div class="info-placeholder"><p>No rules or guides found matching your search term.</p></div>`;
             return;
         }

         let htmlContent = `<div class="search-results-container"><h4>Search Results (click to view):</h4>`;
         results.forEach(topic => {
             if (rulesData[topic]) {
                 let titleHtml = rulesData[topic].title;
                 const hasExternalIconAlready = titleHtml.includes('external-link-icon');
                 const isExternalLinkTopic = (topic === 'cyclingcode' || topic === 'safetystandard');

                 const iconHtml = (isExternalLinkTopic && !hasExternalIconAlready) ? ' <span class="external-link-icon">↗</span>' : '';
                 htmlContent += `<button class="search-result-item" data-topic="${topic}">${titleHtml}${iconHtml}</button>`;
             } else {
                 console.warn(`   Search result topic "${topic}" not found in rulesData during display.`);
             }
         });
         htmlContent += `</div>`;
         infoDisplay.innerHTML = htmlContent;

         infoDisplay.querySelectorAll('.search-result-item').forEach(item => {
             item.addEventListener('click', (event) => {
                 const buttonElement = event.target.closest('button');
                 if (buttonElement) {
                    const topic = buttonElement.dataset.topic;
                    console.log("   Search result button clicked:", topic);
                    displayRuleInfo(topic, null);
                 }
             });
         });
     }

    // --- Function to reset view ---
    function showAllTopics() {
        console.log(">>> showAllTopics called.");
        if (infoDisplay) {
             infoDisplay.innerHTML = initialInfoPlaceholder;
        } else {
             console.error("ERROR: infoDisplay element not found in showAllTopics.");
        }
        if(searchInput) searchInput.value = '';
        setActiveButton(null);
    }

    // --- Attach Event Listeners ---
    console.log("Attaching main navigation button listeners...");
    if(allNavButtons.length > 0){
        allNavButtons.forEach(button => {
            if (button.dataset.topic) {
                 button.addEventListener('click', (event) => {
                     const targetButton = event.currentTarget;
                     const topic = targetButton.dataset.topic;
                     console.log(`>>> Nav button CLICKED! Topic: ${topic}`);

                     if (topic === 'all') {
                         showAllTopics();
                     } else {
                         displayRuleInfo(topic, targetButton);
                         if(searchInput) searchInput.value = '';
                     }
                 });
            }
        });
         console.log("Finished attaching main navigation button listeners.");
    } else {
         console.warn("No navigation buttons found to attach listeners to.");
    }

     // --- Search Input Listener ---
     if (searchInput) {
         console.log("Attaching search input listener...");
         searchInput.addEventListener('input', () => {
             const searchTerm = searchInput.value.trim().toLowerCase();

             if (searchTerm.length < 2) {
                  if (searchTerm.length === 0 && infoDisplay && infoDisplay.querySelector('.search-results-container, .rule-section')) {
                      showAllTopics();
                  } else if (searchTerm.length === 1 && infoDisplay && infoDisplay.querySelector('.search-results-container')) {
                       infoDisplay.innerHTML = `<div class="info-placeholder"><p>Enter at least 2 characters to search.</p></div>`;
                       setActiveButton(null);
                  }
                 return;
             }

             const matchedTopics = [];
             for (const topic in rulesData) {
                 if (rulesData.hasOwnProperty(topic)) {
                     const data = rulesData[topic];
                     let found = false;
                     const contentText = data.sections.map(s => ((s.heading || '') + ' ' + (s.content || '')).toLowerCase().replace(/<[^>]*>/g, ' ')).join(' ');

                     if (data.title.toLowerCase().includes(searchTerm)) found = true;
                     if (!found && data.keywords && data.keywords.toLowerCase().includes(searchTerm)) found = true;
                     if (!found && contentText.includes(searchTerm)) found = true;

                     if (found) matchedTopics.push(topic);
                 }
             }
             displaySearchResults(matchedTopics);
         });
          console.log("Search input listener attached.");
     } else {
          console.warn("Search input element not found, listener not attached.");
     }

     // --- Initial State ---
     console.log("Setting initial state...");
     showAllTopics();
     console.log("Dashboard initialization complete.");

}); // End DOMContentLoaded
