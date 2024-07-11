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

CustomImageCellRenderer01 Sample - Developed in Visual Studio Code.
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

This example shows how to insert an image into a cell renderer. 
*/
class CustomImageCellRenderer01 extends Sprite /*implements ICellRenderer*/ {
	
	/**----------------------------------------------------------------------------------------------------------------------------------- 
	 * CustomImageCellRenderer01() 
	 * Create a new instance of CustomImageCellRenderer01  
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ constructor () {
        super();
        /*private var*/  this._ICR     /*:ICellRenderer*/ = new ICellRenderer(); //Composite implement ICellRenderer
        /*private var*/  this._jsc_img /*:jsc_svg*/       = new jsc_svg();       //Exported image class    
        this.addChild(this._jsc_img);
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------  
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *----------------------------------------------------------------------------------------------------------------------------------*/
	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * data : Object 
	 * Gets or defines an object that represents the data associated with a component. 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set data(data/*:Object*/)/*:void*/{this._ICR.data = data;}	
    /*public function*/ get data()/*:Object*/{return this._ICR.data;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * listData : ListData
	 * Gets or sets list properties that apply to the cell, for example, the index and selected values. 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set listData(listData/*:ListData*/)/*:void*/{this._ICR.listData = listData;}	
    /*public function*/ get listData()/*:ListData*/{return this._ICR.listData;}
        
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * x : Number [Override of Sprite]
	 * Defines the x coordinate of the cell renderer  
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set x(x/*:Number*/)/*:void*/{super.x = this._ICR.x = x;}	
    /*public function*/ get x()/*:Number*/{return this._ICR.x;}
    
     /**-----------------------------------------------------------------------------------------------------------------------------------
	 * y : Number [Override of Sprite]
	 * Defines the y coordinate of the cell renderer 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set y(y/*:Number*/)/*:void*/{super.y = this._ICR.y = y;}	
    /*public function*/ get y()/*:Number*/{return this._ICR.y;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
	 * width : Number [Override of Sprite]
	 * This property is called every time the cell width is changed.
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set width(w/*:Number*/)/*:void*/{super.width = w;this._ICR.width = w;}	
    /*public function*/ get width()/*:Number*/{return this._ICR.width;}

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * height : Number [Override of Sprite]
	 * This property is called every time the height of the cell is changed.
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set height(h/*:Number*/)/*:void*/{super.height = h;this._ICR.height = h;}	
    /*public function*/ get height()/*:Number*/{return this._ICR.height;}
    
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *----------------------------------------------------------------------------------------------------------------------------------*/
    /**-----------------------------------------------------------------------------------------------------------------------------------
	 * setSize(width:Number, height:Number):void [Override of Sprite]
	 * Sets the size of the data with the pixel values specified in the width and height parameters. 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ setSize(width/*:Number*/, height/*:Number*/)/*:void*/{
        this.width  = width;
        this.height = height;
    }	
}