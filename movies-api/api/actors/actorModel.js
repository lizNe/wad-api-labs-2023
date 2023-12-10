import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  adult: { type: Boolean, required: true },
  also_known_as: { type: [String], required: true },
  biography: { type: String, required: true },
  birthday: { type: Date, required: true },
  deathday: { type: Date },
  gender: { type: Number, required: true },
  homepage: { type: String },
  id: { type: Number, required: true, unique: true },
  imdb_id: { type: String },
  known_for_department: { type: String, required: true },
  name: { type: String, required: true },
  place_of_birth: { type: String },
  popularity: { type: Number, required: true },
  profile_path: { type: String },
});

ActorSchema.statics.findByActorDBId = function (id) {
    return this.findOne({ id: id });
  };

export default mongoose.model('Actors', ActorSchema);

