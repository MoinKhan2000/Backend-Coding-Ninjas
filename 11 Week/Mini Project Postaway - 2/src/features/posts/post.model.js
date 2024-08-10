export class PostModel {
  constructor(caption, imageUrl, createdBy, id) {
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.createdBy = createdBy;
    this._id = id
  }
}