# gaffa-form

form view for gaffa

## Install:

    npm i gaffa-form

## Add to gaffa:

    gaffa.views.constructors.form = require('gaffa-form');

# API

## Properties (instanceof Gaffa.Property)

### valid (set)

    The rendered elements validity state.

### method (set)

    The rendered elements method.

### action (set)

    The rendered elements action.

    Note: If a Forms action is not set, the its submit event will be preventDefault()'d