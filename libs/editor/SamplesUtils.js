/*
FormCod_Image00   Copyright © [2020] - Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com

@license
jActionLib and jActionFramework is subject to the terms of the Mozilla private
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

You can freely use jActionLib and jActionFramework within MPL limitations.

The default images that are used by the library and the framework have been created completely
from scratch and we have the source files to demonstrate it, therefore they are copyrighted but
can be used freely and even commercially, as long as they are used together to the library and
the framework. You cannot take the images from the library and the framework and use them 
separately elsewhere.

The images and example codes that are not part of the library or the framework are copyrighted
and their use is not allowed outside the learning objective and visual sample for their own use,
you can upload the examples to your server with the intention of use private to see how it works,
but it is not allowed to publish these examples publicly permanently, through fixed links or 
indentations in search engines, for more information read the section about copyright at www.jaction.org

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

FormCod_Image00
*/
class SamplesUtils {

    /*public*/ static /*function*/ iterateBuffer(ROWS/*:Array*/)/*:String*/{

        let buffer /*:String*/ = '';
        let color  /*:String*/ = '#432744';
        const rdS  /*:String*/ = '<tr style="height: 16px; background-color: ';
        const rdE  /*:String*/ = ';"><td style="width: 100%; height: 16px;">';
        const rl   /*uint*/    = ROWS.length;

        for(let i/*:uint*/=0;i<rl;i++){

            if(ROWS[i][0]=='i'){ //i = intro

                    buffer = ROWS[i][1]+'<table style="height: 0px; width: 100%; border-style: solid; border-collapse: collapse;  border-radius: 10px;" border="1" bordercolor="#141a24" cellpadding="5"><tbody>';

            }else if(ROWS[i][0]=='s'){//s = separator
                buffer = buffer +rdS+'#432744'+rdE+'<span style="color: #b768b7;">'+ROWS[i][1]+'</span><br><span>'+ROWS[i][2]+'</span></td></tr>';

            }else if(ROWS[i][0]=='v'){//v = value

                color  = i%2==0 ? '#263245':'#202b3c';
                buffer = buffer +rdS+color+rdE+'<span style="font-weight: bold; font-size:15px;" >'+G.SyntaxColor.highlight(ROWS[i][1],"js")+'</span><br><span>'+ROWS[i][2]+'</span></td></tr>';

            }else if(ROWS[i][0]=='e'){ //e = end

                buffer = buffer +'</tbody></table>';

            }
        }
        return '<code>'+buffer+'</code>';
    }

    /*public*/ static /*function*/ resizeByAspectRatio(image/*:Image*/,maxWidth/*:Number*/,maxHeight/*:Number*/)/*:void*/{
        let contentW  /*:Number*/ = image.contentWidth;
        let contentH  /*:Number*/ = image.contentHeight;
        let ratio     /*:Number*/ = 0;

        if(contentW > maxWidth){
            ratio  = maxWidth / contentW;   
            contentH = contentH * ratio;     
            contentW  = contentW * ratio;      
        }
        if(contentH > maxHeight){
            ratio  = maxHeight / contentH; 
            contentW  = contentW * ratio;      
            contentH = contentH * ratio;    
        }
        image.width  = contentW;
        image.height = contentH;
    }
}