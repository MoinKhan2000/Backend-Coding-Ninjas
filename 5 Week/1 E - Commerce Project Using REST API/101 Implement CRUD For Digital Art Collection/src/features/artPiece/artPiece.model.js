// Please don't change the pre-written code
// Import the necessary modules here

export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static db = [];

  static create({ title, artist, year, imageUrl }) {
    const artPiece = new ArtPiece(
      ArtPiece.db.length + 1,
      title,
      artist,
      year,
      imageUrl
    );
    ArtPiece.db.push(artPiece);
    return artPiece;
  }

  static findAll(query) {
    return ArtPiece.db
  }

  static findOne(id) {
    console.log(id);
    const index = ArtPiece.db.findIndex((art) => art.id === Number.parseInt(id));
    return ArtPiece.db[index];
  }

  static update(id, data) {
    const index = ArtPiece.db.findIndex((art) => art.id === Number.parseInt(id));
    if (index != -1) {
      ArtPiece.db[index] = { ...ArtPiece.db[index], ...data }
      return ArtPiece.db[index];
    }
    return null;

  }

  static delete(id) {
    const index = ArtPiece.db.findIndex((art) => art.id === Number.parseInt(id));
    if (index != -1) {
      ArtPiece.db.splice(index, 1);
      return true;
    }
    return false;
  }
}
