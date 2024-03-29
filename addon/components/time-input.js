import Ember from 'ember';
import layout from '../templates/components/time-input';
import momentjs from 'moment';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['time-input'],
  classNameBindings: ['invalid'],

  format: 'hhmm',
  invalid: false,

  valueString: Ember.computed('value', function() {
    return momentjs(this.get('value')).format(this.get('format'));
  }),

  actions: {
    valueChanged(valueString) {
      var parsed = momentjs(valueString, this.get('format'));
      this.set('invalid', !parsed.isValid());
      if (parsed.isValid()) {
        var date = this.get('value');
        var newDate = new Date(date.getTime());
        newDate.setHours(parsed.hours());
        newDate.setMinutes(parsed.minutes());
        this.set('value', newDate);
        this.sendAction('action', newDate);
      }
    }
  }
});
