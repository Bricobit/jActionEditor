**Naming Conventions:**
snake_case combined with camelCase

1. Private variables (accessible only by the class):
   - Start with `#_` and use camelCase.
   - May end with a dash and letters to identify the type (e.g. `#_login_btn`, or typeless `#_index`).

2. Important object or array variables to highlight:
   - Can be completely uppercase if desired (e.g. `#_BINDINGS`).

3. Local function variables:
   - No underscore, using camelCase (e.g. `myLocalVar`).

4. Public properties and methods:
   - Use camelCase. (e.g. `enabled`).

5. Private methods:
   - Use PascalCase. (e.g. `#OnClick`).

Even if the language does not support typing, it is necessary to indicate between comments the types of
variables, parameters, values returned by functions, etc.
e.g.

```javascript
class PropertyInspector extends Form {

    /*private var*/ #_BINDINGS         /*:Object*/        = {};
    /*private var*/ #_owner            /*:Form*/          = null;
    /*private var*/ #_INSP             /*:Object*/        = {};
    /*private var*/ #_params           /*:Object*/        = {};
    /*private var*/ #_selectedItem     /*:DisplayObject*/ = null;
    /*private var*/ #_dpLabelPlacement /*:DataProvider*/  = new DataProvider(['left','right','top','bottom']);
    /*private var*/ #_dpAutoSize       /*:DataProvider*/  = new DataProvider(['left','center','right','none']);
    /*private var*/ #_dpHVSPolicy      /*:DataProvider*/  = new DataProvider(['auto','on','of']);
    /*private var*/ #_PREPARED         /*:Array*/         = [];
    /*private var*/ #_push_btn         /*:Button*/        = new Button('Push');

    /*public function*/ constructor(){
        super();
        /*inherit prop*/ this.width        = 310;
        /*inherit prop*/ this.text         = 'PropertyInspector'; 
        /*inherit prop*/ this.draggableBox = true;
        /*inherit prop*/ this.headerHeight = 22;
        /*inherit prop*/ this.anchor       = 'top | bottom';
    }

    /**
     * ---------------------------------------------------------------------------
     * Second constructor, it is called automatically 
     * by FormLoader right after it has been loaded
     * @param {Array} params
     * @returns {void}
     * ---------------------------------------------------------------------------
     */

    /*public function*/ PropertyInspector(params/*:Array*/=null)/*:void*/{
        //...
    }

    /**
     * ---------------------------------------------------------------------------
     * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * *
     * * * * * * * * * * * * * *   camelCase       * * * * * * * * * * * * * * * *  
     * ---------------------------------------------------------------------------
     */

     /**
      * ---------------------------------------------------------------------------
      * onSelectedItems : Function
      * ...
      * ---------------------------------------------------------------------------
      */

    /*public function*/ set onSelectedItems(callback/*:Function*/)/*:Number*/{
        this.#_stageWrap.onSelectedItems = callback;
    }
    /*public function*/ get onSelectedItems()/*:Function*/{
        return this.#_stageWrap.onSelectedItems;
    }

    /**
     * ----------------------------------------------------------------------------
     * * * * * * * * * * * * * *   PUBLIC METHODS  * * * * * * * * * * * * * * * * 
     * * * * * * * * * * * * * *    camelCase      * * * * * * * * * * * * * * * *   
     * ----------------------------------------------------------------------------
     */

    /**
     * ---------------------------------------------------------------------------
     * [en]
     * @param {Array} params
     * @returns {void}
     * [es]
     * @param {Array} params
     * @returns {void}
     * ---------------------------------------------------------------------------
     */

    /*public function*/ onSelectedItems(item/*:UIComponent*/)/*:void*/{
        let params /*:Array*/ = null;
              if(item instanceof Button     ){params = this.#_params.btn;
        }else if(item instanceof CheckBox   ){params = this.#_params.chk;
        }else if(item instanceof ColorPicker){params = this.#_params.clp;
        }
        //...
    }

    /**
     * ----------------------------------------------------------------------------
     * * * * * * * * * * * * * *   PRIVATE METHODS  * * * * * * * * * * * * * * * * 
     * * * * * * * * * * * * * *    PascalCase      * * * * * * * * * * * * * * * *   
     * ----------------------------------------------------------------------------
     */

    /**
     * ----------------------------------------------------------------------------
     * #OnChangeSelectedItems
     * @param {EditorEvent} e
     * @returns {void}
     * ----------------------------------------------------------------------------
     */

    /*private function*/ #OnChangeSelectedItems(e/*:EditorEvent*/)/*:void*/{
        const CMB  /*:Array*/ = [];
        //...
    }
}
