var Gaffa = require('gaffa'),
    doc = require('doc-js'),
    crel = require('crel');

function Form(){}
Form = Gaffa.createSpec(Form, Gaffa.ContainerView);
Form.prototype._type = 'form';

Form.prototype.render = function(){
    var view = this,
        renderedElement = crel('form')

    renderedElement.addEventListener('submit', function (event) {
        if(!view.action.value){
            event.preventDefault();
        }
    });

    this.views.content.element = renderedElement;

    this.renderedElement = renderedElement;

    doc(renderedElement).on('change', function(){
        if(!renderedElement.checkValidity){
            // This browser is old.
            return;
        }

        view.valid.set(renderedElement.checkValidity());
    });

};

Form.prototype.method = new Gaffa.Property({
    update: function(view, value){
        view.renderedElement.setAttribute('method', value);
    },
    value: 'POST'
});
Form.prototype.action = new Gaffa.Property(function(view, value){
    view.renderedElement.setAttribute('action', value);
});
Form.prototype.valid = new Gaffa.Property();

module.exports = Form;