import mongoose, { Schema } from 'mongoose';
var GographySchema = Schema({
  position: String
});

export const Gography = mongoose.model('Gography', GographySchema);
