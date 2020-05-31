export const reportError = (err: Error, silent = false) => {
  console.error(err);
  if (!silent) alert(err.message);
};

export const directMessageId = (me: string, other: string) => {
  return me < other ? `${me}-${other}` : `${other}-${me}`;
};

export const detectLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    const geo = window.navigator.geolocation;
    if (!geo) {
      reject(new Error("Your browser doesn't support geolocation"));
      return;
    }
    geo.getCurrentPosition(
      (pos) => {
        resolve(pos.coords);
      },
      (err) => {
        reject(new Error('Cannot get location'));
      },
      { enableHighAccuracy: true }
    );
  });
};

export const uploadToCloudinary = (cloudName: string, image: string) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'gallery_preset');
  return fetch(url, {
    method: 'POST',
    body: data,
  }).then((res) => res.json());
};
