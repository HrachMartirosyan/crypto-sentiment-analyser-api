import { model, Schema, Document } from 'mongoose';
import { Company } from '@interfaces/company.interface';

const companySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const CompanyModel = model<Company & Document>('Company', companySchema);

export default CompanyModel;
