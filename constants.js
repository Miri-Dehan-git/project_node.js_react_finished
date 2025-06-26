const SUBSCRIPTION_STATUSES = ['trial', 'premium', 'admin','expired_trial'];
const PART_OF_SPEECH= [
            'Noun', 
            'Verb', 
            'Adjective', 
            'Adverb', 
            'Pronoun', 
            'Preposition', 
            'Conjunction', 
            'Interjection'
        ] 
const USER_UPDATE_ALLOWED_FIELDS = ['name',  'lastName','level'];
const USER_UPDATE_ALLOWED_LISTS_FIELDS=['serchedWords', 'failedWords', 'correctWords','personalWordLists']
const SCORE_FIELDS_ALLOWED_TO_BE_UPDATED_BY_USER=['pronunciationScore', 'vocabularyScore', 'grammarScore', 'spellingScore', 'readingComprehensionScore' ]
const LEVELS =['בסיסית (Band I)', 'בינונית (Band II)', 'טובה (Band III)', 'מתקדמת (אנגלית טובה)', 'מצוינת (אנגלית שוטפת)']
const TRIAL_PERIOD_DAYS = 30;
const TRIAL_REMINDER_DAYS = 3;








module.exports = { SUBSCRIPTION_STATUSES , TRIAL_REMINDER_DAYS,TRIAL_PERIOD_DAYS,PART_OF_SPEECH,USER_UPDATE_ALLOWED_FIELDS,LEVELS,SCORE_FIELDS_ALLOWED_TO_BE_UPDATED_BY_USER,USER_UPDATE_ALLOWED_LISTS_FIELDS};