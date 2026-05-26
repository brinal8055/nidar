export type PendingHairPhoto = {
  file: File;
  id: string;
  name: string;
};

let pendingHairPhotos: PendingHairPhoto[] = [];

function getPhotoId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function addPendingHairPhotos(files: File[]) {
  const nextPhotos = files.map((file) => ({
    file,
    id: getPhotoId(file),
    name: file.name,
  }));

  const byId = new Map(pendingHairPhotos.map((photo) => [photo.id, photo]));
  nextPhotos.forEach((photo) => byId.set(photo.id, photo));
  pendingHairPhotos = Array.from(byId.values());
  return pendingHairPhotos;
}

export function removePendingHairPhoto(name: string) {
  pendingHairPhotos = pendingHairPhotos.filter((photo) => photo.name !== name);
  return pendingHairPhotos;
}

export function getPendingHairPhotos() {
  return pendingHairPhotos;
}

export function clearPendingHairPhotos() {
  pendingHairPhotos = [];
}
