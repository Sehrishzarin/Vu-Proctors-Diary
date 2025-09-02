import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/VUPD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
