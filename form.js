var Gaffa = require('gaffa'),
    doc = require('doc-js'),
    crel = require('crel');

function Form(){}
Form = Gaffa.createSpec(Form, Gaffa.ContainerView);
Form.prototype._type = 'form';

Form.prototype.render = function(){
    var view = this,
        renderedElement = crel('form')

    if (this.action) {
        renderedElement.setAttribute("action", this.action);
    } else {
        renderedElement.addEventListener('submit', function (event) {
            if(view.actions.submit){
                event.preventDefault();
            }
        });
    }

    this.views.content.element = renderedElement;

    this.renderedElement = renderedElement;

    doc(renderedElement).on('change', function(){
        if(!renderedElement.checkValidity){
            // This browser is old.
            return;
        }

        // https://code.google.com/p/chromium/issues/detail?can=2&q=checkValidity&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified&id=360444&thanks=360444&ts=1396842451
        setTimeout(function(){
            view.valid.set(renderedElement.checkValidity());
        },0);
    });

};

Form.prototype.method = new Gaffa.Property({
    update: function(view, value){
        view.renderedElement.setAttribute('method', value);
    },
    value: 'POST'
});
Form.prototype.valid = new Gaffa.Property();

module.exports = Form;