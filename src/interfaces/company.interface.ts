import { Document } from 'mongoose';

export interface Company extends Document {
  _id: string;
  slug: string;
  name: string;
}
