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

Package:      samples/libs/samples/Rule 
Class:	      public static class Rule
Version:
0.0.2 - Last update 2024-06-15 -> The rules have been modified to start from a negative value to a positive value, instead of starting from 0
                                  They will also have a default distance instead of depending on the size of their parent container.
0.0.1 - Last update 2024-05-07 -> First version
*/
class Rule extends Sprite{

     /*private var*/ #_rules_spt      /*:Sprite*/ = new Sprite();
     /*private var*/ #_ruleH_spt      /*:Sprite*/ = null;
     /*private var*/ #_ruleV_spt      /*:Sprite*/ = null;
     /*private var*/ #_fontSize       /*:Number*/ = 8;
     /*private var*/ #_fontFamily     /*:String*/ = 'Verdana';
     /*private var*/ #_rulesThickness /*:Number*/ = 15; //The height for the horizontal rule and the width for the vertical rule
     /*private var*/ #_fontMetric_div  /*:Div*/    = null;

	/*public function*/ constructor (){
		super()
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ applyTo(div/*:DisplayObject*/)/*:void*/ {
        this.addChild(div);
        this.drawRules(this.#_rules_spt, this.width, this.height);
        window.addEventListener('resize', () => {
            this.drawRules(this.#_rules_spt, this.width, this.height);
        });
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

     /*public function*/ containerSize(width/*:Number*/, height/*:Number*/)/*:void*/ {
        this.width  = width ;
        this.height = height;
        this.drawRules(this.#_rules_spt, width, height);
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * al 100% de zoom las rayas de la regla deben ser cada 5 pixeles y la raya larga cada 50 pixeles
     * el resultado seria | .  .  .  .  .  .  .  .  . |  .   .  . .   .  .  .  .  .  |
     *                    0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*private function*/ drawRules(container/*:DisplayObject*/, width/*:Number*/, height/*:Number*/)/*:void*/ {
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

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

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

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * createHRuleBySvg 
     * 
     * ||||||||||||
     * 
     * @param {DisplayObject} container             The container where the rule is inserted, usually the reference to a Sprite
     * @param {uint}          oneStripeEveryXPixels Every how many pixels a stripe will be painted
     * @param {uint}          lineHSize             The normal or common height of all stripes
     * @param {Number}        lineWidth             The thickness of the stripes
     * @param {uint}          eachXStripesOneHigher Every how many pixels a higher stripe will be created
     * @param {uint}          heightForTheTallest   The height for the tallest stripes
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ createHRuleInTo(container, min = -3000, max = 8000, oneStripeEveryXPixels = 5, lineHSize = 3, 
                                        lineWidth = 1, eachXStripesOneHigher = 50, heightForTheTallest = 13) {
        const totalStripes      /*:uint*/   = Math.ceil((max - min) / oneStripeEveryXPixels); //Obtenemos el total de rayas que se dibujaran
        const ruleWidth         /*:uint*/   = totalStripes * oneStripeEveryXPixels;//Obtenemos el ancho total de la regla
        const ruleHeight        /*:uint*/   = this.#_rulesThickness; //Obtenemos el alto preestablecido de la regla
          let svgStripes        /*:String*/ = '';
          let svgNumHighStripes /*:String*/ = ''; //the svg texts associated with each long line

        if (this.#_ruleH_spt == null) {
            this.#_ruleH_spt /*:Sprite*/ = new Sprite();
            this.#_ruleH_spt.outline     = '#000000 1px solid';//Debug
            //this.#_ruleH_spt.x = 15;
            container.addChild(this.#_ruleH_spt);
        }
       
        this.#_ruleH_spt.setSize(ruleWidth,ruleHeight);
        
        for (let i = 0; i <= totalStripes; i++) {
            const currLineNum       /*:int*/     = min + (i * oneStripeEveryXPixels);
            const isTallerStripe    /*:Boolean*/ = Math.abs(currLineNum % eachXStripesOneHigher) === 0;
            const currentLineHeight /*:int*/     = isTallerStripe ? heightForTheTallest : lineHSize;
            const startY            /*:int*/     = ruleHeight - currentLineHeight;

            svgStripes += `<path d="M ${i * oneStripeEveryXPixels} ${startY} V ${ruleHeight}" fill="none" stroke="#000" stroke-width="${lineWidth}"/>`;

            if (isTallerStripe) {
                svgNumHighStripes += `<text x="${i * oneStripeEveryXPixels + (lineWidth * 2)}" y="9" font-family="Verdana" font-size="8" fill="black">${currLineNum}</text>`;
            }
        }

        const svg = `<svg width="${ruleWidth}" height="${ruleHeight}" xmlns="http://www.w3.org/2000/svg">
            ${svgNumHighStripes}
            ${svgStripes}
        </svg>`;

        this.#_ruleH_spt.background = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
        return this.#_ruleH_spt;
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * createVRuleInTo  
     *      _
     *      _
     *      _
     * 
     * @param {DisplayObject} container             The container where the rule is inserted, usually the reference to a Sprite
     * @param {Number}        min                   The minimum value of the rule
     * @param {Number}        max                   The maximum value of the rule
     * @param {uint}          oneStripeEveryXPixels Every how many pixels a stripe will be painted
     * @param {uint}          lineVSize             The normal or common width of all stripes
     * @param {Number}        lineWidth             The thickness of the stripes
     * @param {uint}          eachXStripesOneHigher Every how many pixels a wider stripe will be created
     * @param {uint}          widthForTheTallest    The width for the widest stripes
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ createVRuleInTo(container, min = -3000, max = 8000, oneStripeEveryXPixels = 5, lineVSize = 3, 
                                            lineWidth = 1, eachXStripesOneHigher = 50, widthForTheTallest = 13) {
        const totalStripes        /*:uint*/   = Math.ceil((max - min) / oneStripeEveryXPixels); //Obtenemos el total de rayas que se dibujaran
        const ruleHeight          /*:uint*/   = totalStripes * oneStripeEveryXPixels;           //Obtenemos la altura total de la regla
        const ruleWidth           /*:uint*/   = this.#_rulesThickness;                          //Obtenemos el ancho preestablecido de la regla
            let svgStripes        /*:String*/ = '';
            let svgNumHighStripes /*:String*/ = '';                                             //the svg texts associated with each long line
        
        if (this.#_ruleV_spt == null) {
            this.#_ruleV_spt         /*:Sprite*/ = new Sprite();
            this.#_ruleV_spt.outline             = '#b909b0 1px solid';//Debug
            
            //this.#_ruleV_spt.y       = 15;
            container.addChild(this.#_ruleV_spt);
            /*
            Creamos in div al vuelo para poder averiguar la altura real del texto en pixeles una vez insertado el numero
            Desa forma podemos colocar el numero justo debajo de cada linea larga.
            */
            this.#_fontMetric_div                  = document.createElement('div');
            this.#_fontMetric_div.style.fontSize   = this.#_fontSize + "px";
            this.#_fontMetric_div.style.position   = "absolute";
            this.#_fontMetric_div.style.width      = 'auto';
            this.#_fontMetric_div.style.height     = 'auto';
            this.#_fontMetric_div.style.fontFamily = this.#_fontFamily;
            this.#_fontMetric_div.style.visibility = 'hidden';
            document.body.appendChild(this.#_fontMetric_div);
            //document.body.removeChild(this.#_fontMetric_div);
        }

        this.#_ruleV_spt.setSize(ruleWidth, ruleHeight);

        for (let i = 0; i <= totalStripes; i++) {
            const currLineNum      /*:int*/     = min + (i * oneStripeEveryXPixels);
            const isWiderStripe    /*:Boolean*/ = Math.abs(currLineNum % eachXStripesOneHigher) === 0; //Si es múltiplo es linea larga
            const currentLineWidth /*:int*/     = isWiderStripe ? widthForTheTallest : lineVSize;      //Establecemos linea larga o corta
            const startX           /*:int*/     = ruleWidth - currentLineWidth;                        //Establecemos x al final del ancho de la regla y le restamos el ancho de la linea

            svgStripes += `<path d="M ${startX} ${i * oneStripeEveryXPixels} H ${ruleWidth}" fill="none" stroke="#000" stroke-width="${lineWidth}"/>`;

            if (isWiderStripe) {
                this.#_fontMetric_div.textContent = currLineNum;
                const wT /*:Number*/              = this.#_fontMetric_div.clientWidth;
                /*
                Creamos el texto y lo rotamos 90 grados en sentido antihorario, al rotar-lo sus coordenadas x e y se invierten, tenlo en cuenta.
                Posicionamos el texto en x que es y a la misma altura que la raya actual y al rotar-lo este queda por encima de la raya, por lo tanto su ancho lo descontamos
                para posicionar-lo por debajo de la raya.
                */
                svgNumHighStripes += `<text x="${-((i * oneStripeEveryXPixels)+wT+(lineWidth * 2))}" y="${ruleWidth-(lineVSize+2)}" transform="rotate(-90,0,0)" font-family="Verdana" font-size="8" fill="black">${currLineNum}</text>`;
            }
        }

        const svg /*:String*/       = `<svg width="${ruleWidth}" height="${ruleHeight}" xmlns="http://www.w3.org/2000/svg">${svgNumHighStripes} ${svgStripes}</svg>`;
        this.#_ruleV_spt.background = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
        return this.#_ruleV_spt;
    }


    /*private function*/ createHRuleInTo2(  
    container/*:DisplayObject*/, oneStripeEveryXPixels/*:uint*/ = 5 , lineHSize          /*:uint*/ = 3, 
    lineWidth/*:uint*/ = 1     , eachXStripesOneHigher/*:uint*/ = 50, heightForTheTallest/*:uint*/ = 13)/*:Sprite*/{

    // const ruleHeight           /*:uint*/   = this.#_rulesThickness;
    // const totalStripes         /*:uint*/   = Math.ceil(container.width / oneStripeEveryXPixels);//Extraemos el total de rayas 
    // const ruleWidth            /*:uint*/   = totalStripes * oneStripeEveryXPixels;// Ajusta el ancho y la altura del SVG para incluir la última línea y los números
    //   let svgStripes           /*:String*/ = '';
    //   let svgNumHighStripes /*:String*/ = '';

    // if(this.#_ruleH_spt ==null){
    //     this.#_ruleH_spt = new Sprite();
    //     this.#_ruleH_spt.outline = '#000000 1px solid';
    //     this.#_ruleH_spt.x = 15;
    //     container.addChild(this.#_ruleH_spt);
    // }
    // this.#_ruleH_spt.setSize(container.width,ruleHeight);


    // //We form the svg
    // for (let i = 0; i <= totalStripes; i++) {

    //     const currLineNum         /*:int*/     = i*oneStripeEveryXPixels;                //we obtain the position in pixels of the current stripe number
    //     const isTallerStripe    /*:Boolean*/ = currLineNum % eachXStripesOneHigher === 0;// Determina si la línea actual debe ser más alta o normal
    //     const currentLineHeight /*:uint*/    = isTallerStripe ? heightForTheTallest : lineHSize;
    //     const startY            /*:Number*/  = ruleHeight - currentLineHeight;     // Calcula la posición 'y' de inicio para que la línea crezca hacia arriba desde la base

    //     // Añade la línea al contenido SVG
    //     svgStripes += `<path d="M ${currLineNum} ${startY} V ${ruleHeight}" fill="none" stroke="#000" stroke-width="${lineWidth}"/>`;

    //     // Añade los números sobre las rayas más largas
    //     if (isTallerStripe) {
    //         svgNumHighStripes += `<text x="${currLineNum+(lineWidth*2)}" y="9" font-family="Verdana" font-size="8" fill="black">${currLineNum}</text>`;
    //     }
    // }

    // const svg = `<svg width="${ruleWidth}" height="${ruleHeight}" xmlns="http://www.w3.org/2000/svg">
    //     ${svgNumHighStripes}
    //     ${svgStripes}   
    // </svg>`;

    // // Usa 'background' en lugar de 'backgroundImage' para evitar recortes
    // this.#_ruleH_spt.background = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
    // return this.#_ruleH_spt;

    }
    createVRuleInTo2(container, oneStripeEveryXPixels = 5, lineVSize = 3, lineWidth = 1, eachXStripesOneHigher = 50, widthForTheTallest = 13)/*:Sprite*/ {
    // const totalStripes = Math.ceil(container.height / oneStripeEveryXPixels);
    // const ruleHeight = totalStripes * oneStripeEveryXPixels;
    // let svgStripes = '';
    // let ruleWidth = this.#_rulesThickness;
    // let svgNumHighStripes = '';



    // //Native code
    // const lDiv            = document.createElement('div');
    // lDiv.style.fontSize   = this.#_fontSize  + "px";
    // lDiv.style.position   = "absolute";
    // lDiv.style.width      = 'auto';
    // lDiv.style.fontFamily = this.#_fontFamily;
    // lDiv.style.visibility = 'hidden';
    // document.body.appendChild(lDiv);

    // if(this.#_ruleV_spt ==null){
    //     this.#_ruleV_spt = new Sprite();
    //     this.#_ruleV_spt.outline = '#b909b0 1px solid';
    //     this.#_ruleV_spt.y = 15;
    //     container.addChild(this.#_ruleV_spt);
    // }
    // this.#_ruleV_spt.setSize(ruleWidth,container.height);




    //     let stripeNumber = 0;
    //     for (let i = 0; i <= totalStripes; i++) {

    //         stripeNumber = i * oneStripeEveryXPixels; //number for high line

    //         let isWiderStripe = stripeNumber % eachXStripesOneHigher === 0;
    //         let currentLineWidth = isWiderStripe ? widthForTheTallest : lineVSize;
    //         let startX = ruleWidth - currentLineWidth;


    //         svgStripes += `<path d="M ${startX} ${stripeNumber} H ${ruleWidth}" fill="none" stroke="#000" stroke-width="${lineWidth}"/>`;

    //         if (isWiderStripe) {
    //         lDiv.textContent = stripeNumber;
    //          let wT = lDiv.clientWidth;


    //             //svgNumHighStripes += `<text transform="rotate(-90,0,0)" x="${-(stripeNumber+wT+lineWidth)}" y="${+hT}" font-family="${this.#_fontFamily}" font-size="${this.#_fontSize}" fill="black">${stripeNumber}</text>`;
    //             svgNumHighStripes += `<text transform="rotate(-90,0,0)" x="${-(stripeNumber+wT+lineWidth)}" y="${10}" font-family="${this.#_fontFamily}" font-size="${this.#_fontSize}" fill="black">${stripeNumber}</text>`;
    //         }
    //     }




    //     const svg = `
    //     <svg height="${ruleHeight}" width="${ruleWidth}" xmlns="http://www.w3.org/2000/svg">
    //     ${svgNumHighStripes}
    //     ${svgStripes}

    //     </svg>`;
    // document.body.removeChild(lDiv);
    // this.#_ruleV_spt.background = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
    // return this.#_ruleV_spt;
    }

}    