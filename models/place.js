class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat:1222, lng:123}
    this.id = new Date().toString() + Math.random().toString();
  }
}
