export enum ApiRovers {
  curiosity = 'Curiosity',
  opportunity = 'Opportunity',
  spirit = 'Spirit',
}

export const ApiEndpoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';

export const ApiKey = 'Wj7y2kISE5cHoKA3pd4mZs2rUZhoBJElQrMElGeG';

export const AllowedCameras: AllowedCamera[] = [
  {
    abbreviation: 'FHAZ',
    camera: 'Front Hazard Avoidance Camera',
    allowedRovers: [
      ApiRovers.curiosity,
      ApiRovers.opportunity,
      ApiRovers.spirit,
    ],
  },
  {
    abbreviation: 'RHAZ',
    camera: 'Rear Hazard Avoidance Camera',
    allowedRovers: [
      ApiRovers.curiosity,
      ApiRovers.opportunity,
      ApiRovers.spirit,
    ],
  },
  {
    abbreviation: 'MAST',
    camera: 'Mast Camera',
    allowedRovers: [ApiRovers.curiosity],
  },
  {
    abbreviation: 'CHEMCAM',
    camera: 'Chemistry and Camera Complex',
    allowedRovers: [ApiRovers.curiosity],
  },
  {
    abbreviation: 'MAHLI',
    camera: 'Mars Hand Lens Imager',
    allowedRovers: [ApiRovers.curiosity],
  },
  {
    abbreviation: 'MARDI',
    camera: 'Mars Descent Imager',
    allowedRovers: [ApiRovers.curiosity],
  },
  {
    abbreviation: 'MARDI',
    camera: 'Navigation Camera',
    allowedRovers: [
      ApiRovers.curiosity,
      ApiRovers.opportunity,
      ApiRovers.spirit,
    ],
  },
  {
    abbreviation: 'PANCAM',
    camera: 'Panoramic Camera',
    allowedRovers: [ApiRovers.opportunity, ApiRovers.spirit],
  },
  {
    abbreviation: 'MINITES',
    camera: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    allowedRovers: [ApiRovers.opportunity, ApiRovers.spirit],
  },
];
