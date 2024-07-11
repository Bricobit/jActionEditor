echo off
goto comment
Script that recursively goes through all the folders in the jaction directory and 
automatically minifies all the js files found and copies them minified inside the
jaction-min folder. The script also if it doesn't find a folder in the jaction-min
directory then it creates it

This script must be in the same folder that contains the jaction and jaction-min folders.

{jAction} Library - http://www.jaction.org - Copyright © 2020 Javier Vicente Medina
Bassed on ActionScript® 3.0 Reference for the Adobe® Flash® Plataform && (ECMAScript) ecma-international.org - W3Schools.com - developer.mozilla.org
Author: Javier Vicente Medina - giskard2010#hotmail#com - http://jvm.bricobit.com

@license
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Please make a backup of your project before using this script, use it 
under your responsibility

MinifyJaction.bat v0.4

:comment
setlocal enabledelayedexpansion
::retrieve the path where the .bat file is located
set thisFolder=%~dp0
::Proyect Dir folder
set findText=forms
::Minify Proyect Dir folder
set replaceText=forms-min
echo Press any key to minify the entire project
pause
for /r %~d0%~p0\forms %%F in (*.js) do (
set fullPath=%%~fF
set fullPathWithoutName=%%~pF
::We replace the path of this script with a blank space from the absolute path
set relativePath=!fullPath:%thisFolder%=!
::We replace the path of this script with a blank space from the unnamed absolute path
set relativePathWithoutName=!fullPathWithoutName:%thisFolder%=!
::In the relative path, we replace the name of the jaction folder with jaction-min
set minifyPath=!relativePath:%findText%=%replaceText%!
::In the relative path with no file name, we replace the name of the jaction folder with jaction-min
set minifyFolder=!relativePathWithoutName:%findText%=%replaceText%!
:: We check if the nameless relative path exists as a folder, if it does not exist we create it
if not exist !minifyFolder! mkdir !minifyFolder!
::Minify files and preserve license comments
call uglifyjs !relativePath! --comments -c -m -o !minifyPath!
echo Minifying file: !relativePath! To !minifyPath!
)
echo Minification process completed successfully
echo Press any key to close
pause