const mongoose = require('mongoose');
require('mongoose-type-email');
const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
      },

      password: {
        type: String,
    },
      fullname: String,
      level: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Good'],
    default: 'Basic'
  },
      subscriptionStatuse: {
        type: String,
        enum: [ "trial", "premium", "admin"],
        default: "trial"
      }
      ,
      vocabularyScore: {
        type: Number,
        default: 0
      },
      grammarScore: {
        type: Number,
        default: 0
      },
      spellingScore: {
        type: Number,
        default: 0
      },
      readingComprehensionScore: {
        type: Number,
        default: 0
      },
      pronunciationScore: {
        type: Number,
        default: 0
      },
        serchedWords: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vocabulary' ,
            default: []
          }],
          learnedWords: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vocabulary' ,
            default: []
          }],
          failedWords: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vocabulary',
              default: [] 
          }]
,
personalWordsList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vocabulary',
    default: []
}]   }, { timestamps: true } );
  
    module.exports=mongoose.model('user',userSchema)
  