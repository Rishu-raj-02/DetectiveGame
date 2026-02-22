export interface Crime {
    id: string;
    date: string;
    victims: string;
    location: string;
    city: string;
    details: string;
    coordinates: { x: string; y: string }; // Percentages for map placement
    clues: string[];
}

export const crimes: Crime[] = [
    {
        id: '1',
        date: 'Feb. 2, 1978',
        victims: 'Brian & Katie Maggiore (20s)',
        location: 'Rancho Cordova',
        city: 'Rancho Cordova',
        details: 'Shot while walking dog; shoelace nearby.',
        coordinates: { x: '45%', y: '15%' },
        clues: ['Shoelace found nearby']
    },
    {
        id: '2',
        date: 'Dec. 30, 1979',
        victims: 'Robert Offerman & Debra Manning',
        location: 'Goleta',
        city: 'Goleta',
        details: 'Shot; Manning raped, rings hidden under mattress, ate turkey, stolen bike.',
        coordinates: { x: '35%', y: '60%' },
        clues: ['Rings under mattress', 'Turkey consumed at scene', 'Stolen bike']
    },
    {
        id: '3',
        date: 'Mar. 13, 1980',
        victims: 'Lyman & Charlene Smith',
        location: 'Ventura',
        city: 'Ventura',
        details: 'Bludgeoned with log; diamond knot bindings.',
        coordinates: { x: '38%', y: '65%' },
        clues: ['Log as weapon', 'Diamond knot bindings']
    },
    {
        id: '4',
        date: 'Aug. 19, 1980',
        victims: 'Keith & Patrice Harrington',
        location: 'Dana Point',
        city: 'Dana Point',
        details: 'Bludgeoned (her skull pulverized); she raped.',
        coordinates: { x: '52%', y: '78%' },
        clues: ['Skull trauma', 'Physical assault']
    },
    {
        id: '5',
        date: 'Feb. 5, 1981',
        victims: 'Manuela Witthuhn (28)',
        location: 'Irvine',
        city: 'Irvine',
        details: 'Raped, bludgeoned; found by mother.',
        coordinates: { x: '55%', y: '82%' },
        clues: ['Bludgeoning', 'Scene found by family']
    },
    {
        id: '6',
        date: 'Jul. 27, 1981',
        victims: 'Cheri Domingo & Gregory Sanchez',
        location: 'Goleta',
        city: 'Goleta',
        details: 'Sanchez shot/beaten 24x; Domingo raped, beaten 10x.',
        coordinates: { x: '32%', y: '58%' },
        clues: ['Overkill (24x strikes)', 'Excessive violence']
    },
    {
        id: '7',
        date: 'May 4, 1986',
        victims: 'Janelle Cruz (18)',
        location: 'Irvine',
        city: 'Irvine',
        details: 'Raped, bludgeoned with pipe wrench; teeth in hair/lungs.',
        coordinates: { x: '58%', y: '85%' },
        clues: ['Pipe wrench weapon', 'Extreme brutality']
    },
    {
        id: '8',
        date: 'June 18, 1976',
        victims: 'First EAR Attack',
        location: 'Rancho Cordova',
        city: 'Rancho Cordova',
        details: 'First recognized attack of the East Area Rapist.',
        coordinates: { x: '42%', y: '12%' },
        clues: ['Masked intruder', 'Binding victims']
    },
    {
        id: '9',
        date: 'Oct. 1, 1977',
        victims: 'Unknown Victim',
        location: 'Sacramento',
        city: 'Sacramento',
        details: 'Attack in La Riviera area.',
        coordinates: { x: '45%', y: '18%' },
        clues: ['Pre-attack surveillance']
    },
    {
        id: '10',
        date: 'July 5, 1978',
        victims: 'Davis Attack',
        location: 'Davis',
        city: 'Davis',
        details: 'Attack shifted to nearby college town.',
        coordinates: { x: '35%', y: '15%' },
        clues: ['Geographic shift']
    }
];
