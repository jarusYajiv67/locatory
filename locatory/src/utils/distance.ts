export const getDistance = (l1: string, l2: string): string => {
  const [lat1, lon1] = l1.split(",").map(Number);
  const [lat2, lon2] = l2.split(",").map(Number);
  return (calcCrow(lat1, lon1, lat2, lon2) * 1000).toFixed(2) + " mts";
};

export const toRad = (val: number): number => {
  return val * Math.PI / 180;
}

export const calcCrow = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  let R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};
