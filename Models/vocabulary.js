const mongoose = require('mongoose');
require('mongoose-type-email');
const vocabularySchema = new mongoose.Schema({
  
    hebrowName: {
        type: String
      },
        englishName: {
            type: String
        },
        level: {
            type: String,
            enum: [
                'Basic',
                'Intermediate',
                'Good',
                'Advanced',
                'Excellent'
              ],
            default: "Basic"
        },
        band: {
          type: String,

            enum: [
                'band1',
                'band2',
                'band3'
              ],
            default: "band1"
        },
     
category: {
    type: String,

    },
    
    partOfSpeech: { type: String, enum: ['noun', 'verb', 'adjective']},
    imageUrl: { 
      type: String 
    },
    exampleSentence: { 
      type: String 
    }
,
audioUrl: { type: String }
      }, { timestamps: true } );
  
    module.exports=mongoose.model('vocabulary',vocabularySchema)
  