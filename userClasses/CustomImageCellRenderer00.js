/*
      _ ___      __  _             
     (_) _ |____/ /_(_)__  ___     
    / / __ / __/ __/ / _ \/ _ \    
 __/ /_/ |_\__/\__/_/\___/_//_/    
|___/ ____                __       
     / __/__ ___ _  ___  / /__ ___ 
    _\ \/ _ `/  ' \/ _ \/ / -_|_-< 
   /___/\_,_/_/_/_/ .__/_/\__/___/ 
                 /_/                

CustomImageCellRenderer00 Sample - Developed in Visual Studio Code.
Based on Free (MPL) {jAction Lib} && {jAction FrameWork} - www.jaction.org
Copyright © 2018/20.. Javier Vicente Medina All Rights Reserved.
Author: Javier Vicente Medina - giskard2010@hotmail.com - jvm.bricobit.com
Last Update -> 22/02/2021

@license jAction and jActionFramework
jActionLib and jActionFramework is subject to the terms of the Mozilla private
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

You can freely use jActionLib and jActionFramework within MPL limitations.

The default images that are used by the library and the framework have been created completely
from scratch and we have the source files to demonstrate it, therefore they are copyrighted but
can be used freely and even commercially, as long as they are used together to the library and
the framework. You cannot take the images from the library and the framework and use them 
separately elsewhere.

@license Examples
The images and example codes that are not part of the library or the framework are copyrighted
and their use is not allowed outside the learning objective and visual sample for their own use,
you can upload the examples to your server with the intention of use private to see how it works,
but it is not allowed to publish these examples publicly permanently, through fixed links or 
indexed in search engines, for more information read the section about copyright at www.jaction.org

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
___________________________________________________________________________________________________

This example shows how to display two types of images depending on the value of label.
It also shows how to center the image vertically and horizontally with respect to the cell size.

Keep in mind that the cell is reused therefore only the data changes, for that reason you should not 
create an instance each time of the image or images but rather you should reuse them.

As javascript does not natively support the implementation interface with class structures, 'implements'
must be implemented through composition all the ICellRenderer structure. 

The list of properties and methods that must be implemented in any class customized by the user are the following: 

props:
data
listData
selected
x
y
width
height

Methods:
setMouseState
setSize

All these properties and methods are called by the cell processor except setMouseState and selected which are not implemented. 
*/
class CustomImageCellRenderer00 extends Sprite /*implements ICellRenderer*/ {
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * CustomImageCellRenderer00() 
	 * 
	 * Create a new instance of CustomImageCellRenderer00  
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ constructor () {
        super();
        /*private var*/  this._ICR     /*:ICellRenderer*/ = new ICellRenderer(); //Composite implement ICellRenderer
        /*private var*/  this._jsc_img /*:jsc_svg*/       = new jsc_svg();       //This class has previously been dynamically exported from the Library class 
        /*private var*/  this._don_img /*:don_svg*/       = new don_svg();       //This class has previously been dynamically exported from the Library class 
        /*inherit prop*/ this.backgroundColor             = 'rgba(253, 169, 78, 0.12)';
        this.addChild(this._jsc_img);
        this.addChild(this._don_img);
        this._jsc_img.visible = false;
        this._don_img.visible = false;
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * data : Object 
	 * 
	 * Gets or defines an object that represents the data associated with a component. 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set data(data/*:Object*/)/*:void*/{this._ICR.data = data;}	
    /*public function*/ get data()/*:Object*/{return this._ICR.data;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * listData : ListData
	 * 
	 * Gets or sets list properties that apply to the cell, for example, the index and selected values. 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set listData(listData/*:ListData*/)/*:void*/{
        if(listData.label =='0'){
            this._jsc_img.visible = true;
            this._don_img.visible = false;
        }else{
            this._jsc_img.visible = false;
            this._don_img.visible = true;
        }
        this._ICR.listData = listData;
    }	
    /*public function*/ get listData()/*:ListData*/{return this._ICR.listData;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * selected : Boolean
	 * 
	 * Gets or sets a Boolean value that indicates whether the current cell is selected. 
	 * 
	 * (It is not implemented and it is not called)
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set selected(selected/*:Boolean*/)/*:void*/{this._ICR.selected = selected;}	
    /*public function*/ get selected()/*:Boolean*/{return this._ICR.selected;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * x : Number [Override of Sprite]
	 * 
	 * Defines the x coordinate of the cell renderer  
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set x(x/*:Number*/)/*:void*/{super.x = this._ICR.x = x;}	
    /*public function*/ get x()/*:Number*/{return this._ICR.x;}
    
     /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * y : Number [Override of Sprite]
	 * 
	 * Defines the y coordinate of the cell renderer 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set y(y/*:Number*/)/*:void*/{super.y = this._ICR.y = y;}	
    /*public function*/ get y()/*:Number*/{return this._ICR.y;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * width : Number [Override of Sprite]
	 * 
	 * This property is called every time the cell width is changed.
	 * When we know the width we can align the image to the center of the cell with respect to the horizontal axis.
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set width(w/*:Number*/)/*:void*/{
        super.width     = w;
        this._ICR.width = w;
        this._jsc_img.x  = (this.width/2)-(this._jsc_img.width/2);
        this._don_img.x  = this._jsc_img.x;
       
    }	
    /*public function*/ get width()/*:Number*/{return this._ICR.width;}

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * height : Number [Override of Sprite]
	 * 
	 * This property is called every time the height of the cell is changed.
	 * When we know the height we can align the image to the center of the cell with respect to the vertical axis. 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set height(h/*:Number*/)/*:void*/{
        super.height     = h;
        this._ICR.height = h;
        this._jsc_img.y   = (this.height/2)-(this._jsc_img.height/2);
        this._don_img.y   = this._jsc_img.y;
    }	
    /*public function*/ get height()/*:Number*/{return this._ICR.height;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * setMouseState(state:String):void
	 * 
	 * Sets the current cell to a specific mouse state. 
	 * (Currently I have not found any use, It is not implemented and it is not called)
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ setMouseState(state/*:String*/)/*:void*/{this._ICR.state = state;}	
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * setSize(width:Number, height:Number):void [Override of Sprite]
	 * 
	 * Sets the size of the data with the pixel values specified in the width and height parameters. 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ setSize(width/*:Number*/, height/*:Number*/)/*:void*/{
        this.width  = width;
        this.height = height;
    }	
}