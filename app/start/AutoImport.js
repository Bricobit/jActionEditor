/*
This file is used to abstract the loading of scripts and keep the index cleaner.

Why do I decide to load the scripts with `document.write` instead of using the 
`script` tag and the `onload` event or 'static module import' knowing that the 
use of `document.write` is discouraged?

Well, because it is faster, it does not require going through an array, and the 
loading is synchronous and blocking. This way, I save a callback in the index, 
which is what I want. I do not need the page to load first because the scripts 
are responsible for generating the interface dynamically. So, by my own choice, 
I want the scripts to load first. It does not make sense to let the DOM load 
first if there is no interface and the dom is empty.
Anyway, if you prefer to use the asynchronous method, you can use the 
AutoImportAsync.js script instead of this one.

I also don't use static class import because it forces me to import every class 
that is used in each module, and it also prevents me from overriding certain 
things native to the global scope directly, like Image or MouseEvent, and I 
would have to do a deep restructuring of the entire library and framework.
But updating all libraries to use import might be fine if it doesn't break 
the comfortable workflow for me.
*/

class AutoImport {

	/*public function*/ constructor(){

        //Library and framework classes minified into a single file for production
        let scripts /*:String*/ = `<script src = "dependencies/jaction-full-min-merged/jActionFull-min.js"></script>`;
        let appPath /*:String*/ = 'app-min';
        
		//The library and framework classes separately without minifying for development
        if(window.location.hostname === 'jaction.org'){
            appPath = 'app';
            scripts = `
            <script src = '../jActionDev/jaction/_Object.js'                                        ></script>
            <script src = '../jActionDev/jaction/events/Event.js'                                   ></script>
            <script src = '../jActionDev/jaction/events/HTTPStatusEvent.js'                         ></script>
            <script src = '../jActionDev/jaction/events/TextEvent.js'                               ></script>
            <script src = '../jActionDev/jaction/events/ErrorEvent.js'                              ></script>
            <script src = '../jActionDev/jaction/events/IOErrorEvent.js'                            ></script>
            <script src = '../jActionDev/jaction/events/SecurityErrorEvent.js'                      ></script>
            <script src = '../jActionDev/jaction/events/DataEvent.js'                               ></script>
            <script src = '../jActionDev/jaction/events/DataChangeEvent.js'                         ></script>
            <script src = '../jActionDev/jaction/events/DataChangeType.js'                          ></script>
            <script src = '../jActionDev/jaction/events/ComponentEvent.js'                          ></script>
            <script src = '../jActionDev/jaction/events/ActivityEvent.js'                           ></script>
            <script src = '../jActionDev/jaction/events/CalendarEvent.js'                           ></script>
            <script src = '../jActionDev/jaction/events/ClipBoardEvent.js'                          ></script>
            <script src = '../jActionDev/jaction/events/ColorPickerEvent.js'                        ></script>
            <script src = '../jActionDev/jaction/events/DatePickerEvent.js'                         ></script>
            <script src = '../jActionDev/jaction/events/FullScreenEvent.js'                         ></script>
            <script src = '../jActionDev/jaction/events/ListEvent.js'                               ></script>
            <script src = '../jActionDev/jaction/events/MouseEvent.js'                              ></script>
            <script src = '../jActionDev/jaction/events/KeyBoardEvent.js'                           ></script>
            <script src = '../jActionDev/jaction/events/ScrollEvent.js'                             ></script>
            <script src = '../jActionDev/jaction/events/SliderEvent.js'                             ></script>
            <script src = '../jActionDev/jaction/events/EventDispatcher.js'                         ></script>
            <script src = '../jActionDev/jaction/events/FocusEvent.js'                              ></script>
            <script src = '../jActionDev/jaction/events/TimerEvent.js'                              ></script>
            <script src = '../jActionDev/jaction/events/ProgressEvent.js'                           ></script>
            <script src = '../jActionDev/jaction/events/LibraryEvent.js'                            ></script>
            <script src = '../jActionDev/jaction/filters/BitmapFilter.js'     			           ></script>
            <script src = '../jActionDev/jaction/filters/GroupShadowFilter.js'     			       ></script>
            <script src = '../jActionDev/jaction/filters/DropShadowFilter.js'     			       ></script>
            <script src = '../jActionDev/jaction/media/Sound.js'                                    ></script>
            <script src = '../jActionDev/jaction/ui/Mouse.js'                                       ></script>
            <script src = '../jActionDev/jaction/ui/MouseCursor.js'                                 ></script>
            <script src = '../jActionDev/jaction/ui/MouseComponent.js'                              ></script>
            <script src = '../jActionDev/jaction/ui/Keyboard.js'                                    ></script>
            <script src = '../jActionDev/jaction/display/StageDisplayState.js'                      ></script>
            <script src = '../jActionDev/jaction/display/DisplayObject.js'                          ></script>
            <script src = '../jActionDev/jaction/display/InteractiveObject.js'                      ></script>	
            <script src = '../jActionDev/jaction/display/DisplayObjectContainer.js'                 ></script>
            <script src = '../jActionDev/jaction/display/Sprite.js'                                 ></script>
            <script src = '../jActionDev/jaction/display/Sprite3D.js'                               ></script>
            <script src = '../jActionDev/jaction/display/MovieClip.js'                              ></script>
            <script src = '../jActionDev/jaction/display/Stage.js'                                  ></script>
            <script src = '../jActionDev/jaction/display/Image.js'                                  ></script>
            <script src = '../jActionDev/jaction/display/Loader.js'                                 ></script>  
            <script src = '../jActionDev/jaction/text/TextField.js'                                 ></script>
            <script src = '../jActionDev/jaction/text/TextFieldType.js'                             ></script>
            <script src = '../jActionDev/jaction/text/TextFieldAutoSize.js'                         ></script>
            <script src = '../jActionDev/jaction/text/TextFormat.js'                                ></script>
            <script src = '../jActionDev/jaction/net/FileReference.js'                              ></script>
            <script src = '../jActionDev/jaction/net/URLRequest.js'                                 ></script>
            <script src = '../jActionDev/jaction/net/URLRequestMethod.js'                           ></script>
            <script src = '../jActionDev/jaction/net/URLVariables.js'                               ></script>
            <script src = '../jActionDev/jaction/net/URLLoader.js'                                  ></script>
            <script src = '../jActionDev/jaction/net/URLLoaderDataFormat.js'                        ></script>
            <script src = '../jActionDev/jaction/net/ObjectEncoding.js'                             ></script>
            <script src = '../jActionDev/jaction/net/NetConnection.js'                		       ></script>
            <script src = '../jActionDev/jaction/fl/core/UIComponent.js'              		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/BaseButton.js'           			   ></script>
            <script src = '../jActionDev/jaction/fl/controls/LabelButton.js'           		       ></script>
            <script src = '../jActionDev/jaction/fl/containers/BaseScrollPane.js'      		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/SelectableList.js'        		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/dataGridClasses/DataGridColumn.js'     ></script>
            <script src = '../jActionDev/jaction/fl/controls/dataGridClasses/RowRenderer.js'        ></script>
            <script src = '../jActionDev/jaction/fl/controls/DataGrid.js'                           ></script>
            <script src = '../jActionDev/jaction/fl/controls/DatePicker.js'             		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/ColorPicker.js'           		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/Button.js'             			       ></script>
            <script src = '../jActionDev/jaction/fl/controls/BigCalendar.js'             		   ></script>
            <script src = '../jActionDev/jaction/fl/controls/TextInput.js'                          ></script>
            <script src = '../jActionDev/jaction/fl/controls/List.js'          		               ></script>
            <script src = '../jActionDev/jaction/fl/controls/Label.js'               		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/NumericStepper.js'      		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/ComboBox.js'           		           ></script>
            <script src = '../jActionDev/jaction/fl/controls/RadioButton.js'             		   ></script>
            <script src = '../jActionDev/jaction/fl/controls/RadioButtonGroup.js'         		   ></script>
            <script src = '../jActionDev/jaction/fl/controls/CheckBox.js'             		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/TimePicker.js'      		           ></script>
            <script src = '../jActionDev/jaction/fl/controls/TextArea.js'            		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/ProgressBar.js'          		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/ProgressBarMode.js'       		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/ScrollPolicy.js'        		       ></script>
            <script src = '../jActionDev/jaction/fl/controls/Slider.js'            		           ></script>
            <script src = '../jActionDev/jaction/fl/controls/SliderDirection.js'   		           ></script>
            <script src = '../jActionDev/jaction/fl/controls/dataGridClasses/DataGridCellEditor.js' ></script>
            <script src = '../jActionDev/jaction/fl/controls/dataGridClasses/HeaderRenderer.js'     ></script>
            <script src = '../jActionDev/jaction/fl/controls/calendarClasses/DayRenderer.js'        ></script>
            <script src = '../jActionDev/jaction/fl/controls/calendarClasses/DayData.js'     	   ></script>
            <script src = '../jActionDev/jaction/fl/controls/listClasses/ICellRenderer.js' 	       ></script>
            <script src = '../jActionDev/jaction/fl/controls/listClasses/CellRenderer.js'   	       ></script>
            <script src = '../jActionDev/jaction/fl/controls/listClasses/ListData.js'     	       ></script>
            <script src = '../jActionDev/jaction/fl/data/DataProvider.js'              		       ></script>
            <script src = '../jActionDev/jaction/fl/managers/GridFocusManager.js'     		       ></script>
            <script src = '../jActionDev/jaction/fl/managers/FocusManager.js'     		           ></script>
            <script src = '../jActionDev/jaction/geom/Point.js'                     		           ></script>
            <script src = '../jActionDev/jaction/utils/Color.js'                    			       ></script>
            <script src = '../jActionDev/jaction/utils/PropertyBuffer.js'              			   ></script>
            <script src = '../jActionDev/jaction/utils/LastCall.js'                    			   ></script>
            <script src = '../jActionDev/jaction/utils/Timer.js'                    			       ></script>
            <script src = '../jActionDev/jaction/utils/DateUtils.js'                    		       ></script>
            <script src = '../jActionDev/jaction/utils/Library.js'                 			       ></script>
            <script src = '../jActionDev/jaction/utils/Line.js'                    			       ></script>
            <script src = '../jActionDev/jaction/jAction.js'                                        ></script>
            <!-- jAction Framework -->
            <script src = '../jActionDev/jaction-framework/Framework.js'                             ></script>
            <script src = '../jActionDev/jaction-framework/events/FrameworkEvent.js'                 ></script>
            <script src = '../jActionDev/jaction-framework/events/FormEvent.js'                      ></script>
            <script src = '../jActionDev/jaction-framework/display/LoaderAnimation.js'               ></script>
            <script src = '../jActionDev/jaction-framework/net/Server.js'                            ></script>
            <script src = '../jActionDev/jaction-framework/forms/FormUtils.js'                       ></script>
            <script src = '../jActionDev/jaction-framework/forms/UpDownForm.js'                      ></script>
            <script src = '../jActionDev/jaction-framework/forms/formClasses/HeaderDrag.js'          ></script>
            <script src = '../jActionDev/jaction-framework/forms/formClasses/HeaderBox.js'           ></script>
            <script src = '../jActionDev/jaction-framework/forms/formClasses/FormProtectors.js'      ></script>
            <script src = '../jActionDev/jaction-framework/forms/formClasses/FormControls.js'        ></script>
            <script src = '../jActionDev/jaction-framework/forms/formClasses/FormHeader.js'          ></script>
            <script src = '../jActionDev/jaction-framework/forms/BaseForm.js'                        ></script>
            <script src = '../jActionDev/jaction-framework/forms/Form.js'                            ></script>
            <script src = '../jActionDev/jaction-framework/forms/FormLoader.js'                      ></script>
            <script src = '../jActionDev/jaction-framework/components/HtmlEditor.js'                 ></script>
            <script src = '../jActionDev/jaction-framework/components/TextAreaHtml.js'               ></script>
            <script src = '../jActionDev/jaction-framework/components/MsgBox.js'                     ></script>
            <script src = '../jActionDev/jaction-framework/components/MsgBoxType.js'                 ></script>
            <script src = '../jActionDev/jaction-framework/components/MsgBoxStyle.js'                ></script>
            <script src = '../jActionDev/jaction-framework/components/MenuBar.js'                    ></script>
            <script src = '../jActionDev/jaction-framework/components/ButtonBar.js'                  ></script>
            <script src = '../jActionDev/jaction-framework/utils/CheckInactivity.js'                 ></script>
            <script src = '../jActionDev/jaction-framework/utils/ArrayCollectionDP.js'               ></script>
            <script src = '../jActionDev/jaction-framework/utils/TextPack.js'                        ></script>
            <script src = '../jActionDev/jaction-framework/utils/SyntaxColor.js'                     ></script>
            <script src = '../jActionDev/jaction-framework/utils/TestDni.js'                         ></script>`;
        }
  
		//Your own utilities or classes developed to support your project
       document.write(scripts+ `
            <script src ='dependencies/third-parties/security/md5.js'               ></script>
            <script src ='dependencies/third-parties/security/utf8_encode.js'       ></script>
            <link   rel ='stylesheet' href='dependencies/third-parties/monaco-editor/min/vs/editor/editor.main.css'>
            <script src ='dependencies/third-parties/monaco-editor/min/vs/loader.js'></script>
            <script src ='`+appPath+`/start/ProxySeal.js'                           ></script>
            <script src ='`+appPath+`/start/Index.js'                               ></script>
            <script src ='`+appPath+`/start/AppStart.js'                            ></script>
            <script src ='`+appPath+`/core/net/ServerRPC.js'                        ></script>
            <script src ='`+appPath+`/core/TextFader.js'                            ></script>
            <script src ='`+appPath+`/core/stage/StageEditorSPT.js'                 ></script>
            <script src ='`+appPath+`/core/stage/Rule.js'                           ></script>
            <script src ='`+appPath+`/core/stage/Grid.js'                           ></script>
            <script src ='`+appPath+`/core/stage/StageEditor.js'                    ></script>
            `);
	}
}
/*
We make it self-executable because once instantiated it is no longer 
needed and it is not necessary to create a variable either.
*/
(function() {new AutoImport();})();