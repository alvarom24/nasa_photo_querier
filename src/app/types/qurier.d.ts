interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

interface ApiResponse {
  id: string;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

type AllowedCamera = {
  abbreviation: string;
  camera: string;
  allowedRovers: string[];
};

type DateFieldChangeParams = {
  dateType: string;
  value: string;
};

type QueryParametersDef = {
  rover: string;
  camera: string;
  sol: string;
  earth_date: string;
  page: string;
};

type DateChangeEvent = {
  type: string;
  value: string;
};
