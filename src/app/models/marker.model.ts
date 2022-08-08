export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  content: string;
  color: string;
  iconUrl: string;
}
