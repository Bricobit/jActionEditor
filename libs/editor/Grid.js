/*
{jActionFramework} - based on jAction Library - https://jaction.org
Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com - Start date: 2018
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      jaction-framework/utils/Grid 
Class:	      public static class Grid
Version:
0.0.1 - Last update 2024-05-06 -> First version
*/
class Grid {

	/*public function*/ constructor (){
		//...
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public*/ static /*function*/ createByCanvas(sprite/*:Sprite3d*/,hSize/*:Number*/=11,vSize/*:Number*/=11,lineWidth/*:Number*/=1,
                                                  lineColor/*:String*/='#000000')/*:void*/ {
        sprite.graphics.beginPath();
        // Horizontal lines
        for (let y /*:Number*/ = 0; y < sprite.height; y += hSize) {
            sprite.graphics.moveTo(0, y);
            sprite.graphics.lineTo(sprite.width, y);
        }
        //Vertical lines
        for (let x /*:Number*/ = 0; x < sprite.width; x += vSize) {
            sprite.graphics.moveTo(x, 0);
            sprite.graphics.lineTo(x, sprite.height);
        }
        sprite.graphics.strokeStyle = lineColor;
        sprite.graphics.lineWidth = lineWidth;
        sprite.graphics.stroke();
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public*/ static /*function*/ createBySvg(sprite/*:Sprite*/,hSize/*:Number*/=11,vSize/*:Number*/=11,lineWidth/*:Number*/=1,
                                               lineColor/*:String*/='#000000')/*:void*/ {
		const svg /*:String*/ = `
        <svg width="${hSize * 10}" height="${vSize * 10}" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <pattern id="grid" width="${hSize}" height="${vSize}" patternUnits="userSpaceOnUse">
                <path d="M ${hSize} 0 L 0 0 0 ${vSize}" fill="none" stroke="${lineColor}" stroke-width="${lineWidth}"/>
            </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>`;
        sprite.backgroundImage = `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22")}')`;
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public*/ static /*function*/ createByLinearGradient(sprite/*:Sprite*/,hSize/*:Number*/,vSize/*:Number*/,lineWidth/*:Number*/=1,
                                                          lineColor/*:String*/='#000000')/*:void*/ {
        /*this.#_grid_spt.backgroundImage  = `repeating-linear-gradient(#1b2432 0 1px, transparent 1px 10px),
                                            repeating-linear-gradient(90deg, #1b2432 0 1px, transparent 1px 10px)`;*/
		sprite.backgroundImage  = `repeating-linear-gradient(`+lineColor+` 0 `+lineWidth+`px, transparent `+lineWidth+`px 100%),
                                   repeating-linear-gradient(90deg, `+lineColor+` 0 `+lineWidth+`px, transparent `+lineWidth+`px 100%)`;
        sprite.backgroundSize   = hSize+'px '+vSize+'px';
	}


     /*private function*/ createByElements(container/*:DisplayObject*/, width/*:Number*/, height/*:Number*/)/*:void*/ {
            //container.node.innerHTML = ''; // Clear previous rules

            const zoomFactor = this.#CalculateZoomFactor();

            // Draw horizontal rules
            for (let i = 0; i <= height; i += 10 * zoomFactor) {
                const rule = new Sprite();
                rule.y = i;
                rule.height = 1;
                rule.backgroundColor = '#000000';
                rule.width = width;
                container.addChild(rule);

                if (i % (50 * zoomFactor) === 0) {
                    const number = new Label();
                    number.text = i;
                    number.y = (i - 5); // Adjust position for number
                    container.addChild(number);
                }
            }

            // Draw vertical rules
            for (let i = 0; i <= width; i += 10 * zoomFactor) {
                const rule = new Sprite();
                rule.x = i;
                rule.width = 1;
                rule.backgroundColor = '#000000';
                rule.height = height;
                container.addChild(rule);

                if (i % (50 * zoomFactor) === 0) {
                    const number = new Label();
                    number.text = i;
                    number.x = (i - 10); // Adjust position for number
                    container.addChild(number);
                }
            }
        }

         /*private function*/ #CalculateZoomFactor()/*:int*/ {
        // Get current zoom level
        const zoom = Math.round(window.devicePixelRatio * 100);
        // Adjust zoom factor according to your requirements
               if (zoom <= 100) {return 1;
        } else if (zoom <= 200) {return 2;
        } else if (zoom <= 300) {return 3;
        } else if (zoom <= 400) {return 4;
        } else {                 return 5;}
    }
}
    