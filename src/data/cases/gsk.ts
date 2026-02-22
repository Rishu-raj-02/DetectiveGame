import { Case } from "../../types";

export const GSK_CASE: Case = {
    id: 'gsk',
    title: 'The Golden State Killer',
    description: 'Investigate the series of crimes that haunted California for decades.',
    stages: [
        {
            id: 1,
            title: 'Pattern Emergence',
            description: 'Multiple late night intrusions with similar entry methods reported across the region.',
            clues: [
                {
                    id: 'gsk-1-1',
                    title: 'Vulnerable Access Points',
                    observation: 'Offender consistently enters through unlocked sliding glass doors or windows.',
                    context: 'Suggests a level of comfort with quiet entry and pre-attack surveillance.',
                    tags: ['operational'],
                    confidenceImpact: 5
                },
                {
                    id: 'gsk-1-2',
                    title: 'Minimal Theft',
                    observation: 'Valuables are often bypassed in favor of small, personal items.',
                    context: 'Indicates the primary motive is not financial gain.',
                    tags: ['behavioral'],
                    confidenceImpact: 10
                },
                {
                    id: 'gsk-1-3',
                    title: 'Prior Observation',
                    observation: 'Neighbors report seeing a suspicious individual loitering in the days before the incidents.',
                    context: 'Offender likely selects targets through careful stalking.',
                    tags: ['geographic'],
                    confidenceImpact: 8
                }
            ],
            decision: {
                id: 'd1',
                question: 'Do these incidents appear linked?',
                options: [
                    {
                        id: 'd1-link',
                        text: 'Yes, they show a consistent pattern of planning.',
                        feedback: 'Investigation continues under the assumption of a single, organized offender.',
                        theoryImpact: { singleOffender: 10, organized: 10 }
                    },
                    {
                        id: 'd1-random',
                        text: 'No, they seem like isolated crimes of opportunity.',
                        feedback: 'Investigation continues as separate local cases.',
                        theoryImpact: { random: 10, multipleOffender: 10 }
                    }
                ]
            }
        },
        {
            id: 2,
            title: 'Escalation',
            description: 'Reports indicate increasing boldness and repeated behaviors.',
            clues: [
                {
                    id: 'gsk-2-1',
                    title: 'Repeated Operational Patterns',
                    observation: 'The "ransacking" behavior has become more methodical.',
                    context: 'Further evidence of a single psychological driver across multiple sites.',
                    tags: ['behavioral', 'operational'],
                    confidenceImpact: 12
                }
            ],
            decision: {
                id: 'd2',
                question: 'Is the offender escalating or are these unrelated incidents?',
                options: [
                    {
                        id: 'd2-escalate',
                        text: 'The offender is clearly escalating in risk and complexity.',
                        feedback: 'Investigation focuses on forensic links between sites.',
                        theoryImpact: { organized: 10, skilledBackground: 5 }
                    },
                    {
                        id: 'd2-unrelated',
                        text: 'These appear to be copycat crimes.',
                        feedback: 'Later reports appear less connected under this assumption.',
                        theoryImpact: { multipleOffender: 10, random: 5 }
                    }
                ]
            }
        },
        {
            id: 3,
            title: 'Behavioral Insights',
            description: 'Summaries of witness experiences reveal calm and controlled behavior.',
            clues: [
                {
                    id: 'gsk-3-1',
                    title: 'Methodical Approach',
                    observation: 'Offender uses pre-cut bindings and shows no panic when confronted.',
                    context: 'Indicates high psychological control and possibly tactical training.',
                    tags: ['behavioral'],
                    confidenceImpact: 15
                },
                {
                    id: 'gsk-3-2',
                    title: 'Psychological Control Indicators',
                    observation: 'Offender uses verbal commands and environmental manipulation to keep victims compliant.',
                    context: 'Suggests a desire for dominance rather than just violence.',
                    tags: ['behavioral'],
                    confidenceImpact: 10
                }
            ],
            decision: {
                id: 'd3',
                question: 'What primary motive pattern is suggested?',
                options: [
                    {
                        id: 'd3-power',
                        text: 'Power and control are the primary drivers.',
                        feedback: 'Investigation focuses on offenders with stable, controlled profiles.',
                        theoryImpact: { organized: 15, singleOffender: 5 }
                    },
                    {
                        id: 'd3-impulse',
                        text: 'The offender is impulsive and disorganized.',
                        feedback: 'Investigation remains broad but reports show less focus on specific profiles.',
                        theoryImpact: { random: 15, organized: -5 }
                    }
                ]
            }
        },
        {
            id: 4,
            title: 'Geographic Pattern',
            description: 'Display stylized California map with incident clusters.',
            clues: [
                {
                    id: 'gsk-4-1',
                    title: 'Regional Clustering',
                    observation: 'Crimes are clustered near major arteries and greenbelts.',
                    context: 'Suggests a high level of geographic familiarity or a job that requires travel.',
                    tags: ['geographic'],
                    confidenceImpact: 12
                },
                {
                    id: 'gsk-4-2',
                    title: 'Travel Feasibility',
                    observation: 'Consistent timing suggests the offender can move between regions with ease.',
                    context: 'Could indicate a commuter or someone with a flexible schedule.',
                    tags: ['geographic'],
                    confidenceImpact: 8
                }
            ],
            decision: {
                id: 'd4',
                question: 'Does this suggest a local offender or mobile pattern?',
                options: [
                    {
                        id: 'd4-local',
                        text: 'The offender is a local with deep knowledge of the area.',
                        feedback: 'Search parameters narrowed to local residents.',
                        theoryImpact: { localFamiliarity: 20 }
                    },
                    {
                        id: 'd4-mobile',
                        text: 'The offender is mobile and travels specifically to commit crimes.',
                        feedback: 'Search parameters expanded to neighboring counties.',
                        theoryImpact: { localFamiliarity: -10, skilledBackground: 5 }
                    }
                ]
            }
        },
        {
            id: 5,
            title: 'Silence Period',
            description: 'Timeline shows sudden disappearance of incidents.',
            clues: [
                {
                    id: 'gsk-5-1',
                    title: 'No Known Capture',
                    observation: 'No arrests in the period match the profile of the offender.',
                    context: 'Could indicate a change in life circumstances (marriage, job move, or death).',
                    tags: ['behavioral'],
                    confidenceImpact: 5
                },
                {
                    id: 'gsk-5-2',
                    title: 'Abrupt Cessation',
                    observation: 'The crimes stop as suddenly as they began.',
                    context: 'Often seen in offenders who find a "safe" outlet or are incapacitated.',
                    tags: ['behavioral'],
                    confidenceImpact: 10
                }
            ],
            decision: {
                id: 'd5',
                question: 'What might explain the disappearance?',
                options: [
                    {
                        id: 'd5-life',
                        text: 'A major life change or relocation.',
                        feedback: 'Cold case focus shifts to historical records of people moving out of the area.',
                        theoryImpact: { organized: 5, localFamiliarity: 5 }
                    },
                    {
                        id: 'd5-end',
                        text: 'The offender died or was imprisoned for an unrelated crime.',
                        feedback: 'Research transitions to prison and obituary records.',
                        theoryImpact: { random: 5 }
                    }
                ]
            }
        },
        {
            id: 6,
            title: 'DNA Linkage',
            description: 'Forensic update confirms biological linkage across incidents.',
            clues: [
                {
                    id: 'gsk-6-1',
                    title: 'Single Offender Confirmation',
                    observation: 'DNA from early East Bay crimes matches later Southern California cases.',
                    context: 'Irrefutable proof of a single, highly mobile serial offender.',
                    tags: ['forensic'],
                    confidenceImpact: 50
                }
            ]
        },
        {
            id: 7,
            title: 'Genealogy Analysis',
            description: 'Investigators use familial DNA to narrow possibilities.',
            clues: [
                {
                    id: 'gsk-7-1',
                    title: 'Relative Matches',
                    observation: 'Third and fourth cousins found in public DNA databases.',
                    context: 'The family tree narrows to a specific lineage in the Sacramento area.',
                    tags: ['forensic'],
                    confidenceImpact: 30
                },
                {
                    id: 'gsk-7-2',
                    title: 'Demographic Narrowing',
                    observation: 'The target is a white male, born between 1940 and 1950.',
                    context: 'Matches the age profile established through behavioral analysis.',
                    tags: ['forensic', 'behavioral'],
                    confidenceImpact: 15
                }
            ],
            decision: {
                id: 'd7',
                question: 'What background characteristics seem likely?',
                options: [
                    {
                        id: 'd7-mil',
                        text: 'Military or Law Enforcement background.',
                        feedback: 'The "skilled" profile is now the primary lead.',
                        theoryImpact: { skilledBackground: 25, organized: 10 }
                    },
                    {
                        id: 'd7-civil',
                        text: 'A civilian with no professional tactical training.',
                        feedback: 'Focus remains on general demographics.',
                        theoryImpact: { skilledBackground: -10 }
                    }
                ]
            }
        },
        {
            id: 8,
            title: 'Suspect Narrowing',
            description: 'Evidence indicates a profile consistent with training and local familiarity.',
            clues: [
                {
                    id: 'gsk-8-1',
                    title: 'Occupational Patterns',
                    observation: 'Suspect worked as a police officer during the time of the crimes.',
                    context: 'Explains the knowledge of police procedure and tactical control.',
                    tags: ['operational', 'forensic'],
                    confidenceImpact: 40
                },
                {
                    id: 'gsk-8-2',
                    title: 'Geographic Proximity',
                    observation: 'Suspect lived in Auburn and Exeter, directly overlapping with crime clusters.',
                    context: 'Final piece of the geographic profiling puzzle.',
                    tags: ['geographic'],
                    confidenceImpact: 20
                }
            ],
            decision: {
                id: 'd8',
                question: 'Submit working offender profile.',
                options: [
                    {
                        id: 'd8-skilled',
                        text: 'Skilled organized offender with local authority access.',
                        feedback: 'Final hypothesis locked for deduction.',
                        theoryImpact: { skilledBackground: 30, organized: 20 }
                    }
                ]
            }
        },
        {
            id: 9,
            title: 'Final Deduction',
            description: 'Submit your full theory of the case.',
            clues: []
        }
    ]
};
