echo off
goto comment

This script requires having node installed first https://nodejs.org/es/download/
Then open a windows command console and type the following line:

npm install terser -g

And hit enter to install
For more info visit 
https://terser.org/docs/cli-usage
https://www.npmjs.com/package/terser

This script recursively iterates all the folders inside the source folder and automatically minifies all
the .js files keeping the same name so as not to break the upload paths.

Then copy the minified files into the destini folder respecting the same folder structure.

If the script does not find the destination folder, it creates it automatically.

For simplicity this script creates a copy of the source folder in the destiny folder but minifies the
files and preserves their names.

Later on the production server when you have the finished and tested project ready to launch, you just
have to take the contents of the destiny folder and put it in the production source folder to replace the 
uncompressed source code with the compressed one.

In local or the development server you will always have the two folders, one with the unminified files
and the other with the minified ones.

This .bat script must be in the same folder that contains the source and destiny folders.
If you need you can change the name of the source and destination folder as well as the path of the sourcemap.

This bat has been created expressly for use with {jAction Lib} and {jAction Framework} - http://www.jaction.org 
Can be used for other purposes
Author: Javier Vicente Medina - giskard2010@hotmail.com - http://bricobit.com

Use: Create a folder and inside it copy this bat file now next to the bat create another folder called "forms" 
and inside said folder put your js files or a folder structure with js files. Configure the user variables of
the bat file if necessary, for example the name of the source folder, the name of the destination folder, the
name of the file where the hashes will be stored and the domain path so that the files know where they are. 
its namesake .map. (The .map are created in the same place where the minified js file is located)
Then run the bat file and a "forms-min" folder will be automatically created with 
the same "forms" structure but with the js files minified, the .map will be generated and the md5 hashes in 
case you want to use them.

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

Automation file duplication and minification MinifyJsSourceInToDestiny-min.bat 
version:
0.9 - 2024-02-13 - Now the script is also responsible for generating an md5 hash once the 
                   file is minified, the file name and its hash are stored in the hashes.txt
                   file, these hashes can be used to compare when the file is loaded from 
                   the server with the class FormLoader of the jAction framework. 
0.8 - 2022-08-07 - The script has been modified because a problem has been detected when 
                   minifying when there are several folders with the same name in the path,
                   example: (domain.com/sub/libs/sub), the previous technique consisted of
                   searching and replacing the source folder by the destination one for
                   example /sub by /sub-min, but when searching the first folder sub/libs 
                   was found as the first match and it resulted in an incorrect path, now 
                   this problem has been solved.
                   
0.7 - 2022-08-06 - Change deprecated uglify-en to terser, for support private character '#'
0.6 - 

:comment
setlocal enabledelayedexpansion
rem ----------------------------------- SART config user vars --------------------------------------------------------------------------------------
rem Source folder to traverse to find all folders and .js files
set source=forms
rem Destination folder where a copy of the exact structure of the source folder will be created but with
rem the minified .js files, if the folder does not exist it is created, if it exists only the files whose
rem names match are replaced, if you want to avoid obsolete files that have been renamed, delete the folder and its contents before minifying.
set destiny=forms-min
rem Address to the source folder, this is used to indicate where the .map files are located. sample https://domain.org/
rem If the source folder called forms is located inside another folder called, for example, subfolder, then the following should be indicated https://domain.org/subfolder/
rem The script will concatenate the address indicated with the name of the source folder to the .map file and this path will be stored in the minified js file, for example: https://domain.org/forms/users/AppearanceForm.map
set domainPathToThisSourceFolder=https://jaction.org/jActionEditorDev/
rem File to store hashes
set hashesFile=hashes.txt
rem ---------------------------------- STOP config user vars ---------------------------------------------------------------------------------------

rem retrieve the path where the .bat file is located -> sample: C:\Proyects\domain.org\subdomain\
set thisFolder=%~dp0
rem the full path to the source folder -> sample: C:\Proyects\domain.org\subdomain\sourceFolderName
set folderSource=%thisFolder%%source%\

rem Delete the hash file if it exists, if it does not exist, a not found error will be displayed in the console, nothing happens.
if exist %hashesFile% goto skipDelete
del %hashesFile%
:skipDelete

echo Press any key to minify the entire project
rem We recreate the file to store the hashes
echo. > %hashesFile%
pause
for /r %~dp0%source% %%F in (*.js) do (
    set fileName=%%~nxF
    set fullPathFilename=%%~fF
    rem set fullPathWithoutName=%%~pF
    rem To the full path of the file we remove the path of the source folder. fullPathFilename C:\Proyects\domain.org\subdomain\sourceFolderName\users\file.js - this folder C:\Proyects\domain.org\subdomain\ result -> sourceFolderName\users\file.js
    set sourceRelativePathWithFilename=!fullPathFilename:%thisFolder%=!
    rem To the full path of the file we remove the name of the file. fullPathFilename C:\Proyects\domain.org\subdomain\sourceFolderName\users\file.js - fileName file.js result -> C:\Proyects\domain.org\subdomain\sourceFolderName\users\
    set sourcefullPathToFileWithoutName=!fullPathFilename:%%~nxF=!
    rem To the full path of the file without the file name we remove the path of the source folder. C:\Proyects\domain.org\subdomain\sourceFolderName\users\ - C:\Proyects\domain.org\subdomain\sourceFolderName\ result -> users\
    set sourceRelativePathToFileWithoutName=!sourcefullPathToFileWithoutName:%folderSource%=!
    rem We cocatenate the destination folder to the relative path of source without file name. result  -> destinyFolderName\users\
    set destinyRelativeFolderWithoutName=!destiny!\!sourceRelativePathToFileWithoutName!
    rem We cocatenate the source folder to the relative path of source without file name. result  -> sourceFolderName\users\
    set sourceRelativeFolderWithoutName=!source!\!sourceRelativePathToFileWithoutName!
    rem We invert the slash to the destination relative path so that it is compatible with the url. result-> sourceFolderName/users/
    set sourceRelativeToFilePathWithoutNameForURL=!sourceRelativeFolderWithoutName:\=/!
    rem We check if the nameless relative path exists as a folder, if it does not exist we create it
    if not exist !destinyRelativeFolderWithoutName! mkdir !destinyRelativeFolderWithoutName!
    rem Minify files, create source map and preserve license comments,(the source folder address is used because we are supposed to move the minified files from the destination-min folder to the source folder when it goes into production)
    call terser !sourceRelativePathWithFilename! --comments -c -m -o !destinyRelativeFolderWithoutName!!fileName! --source-map "url='%domainPathToThisSourceFolder%!sourceRelativeToFilePathWithoutNameForURL!!fileName!.map',filename='!fileName!'"
    echo Minifying file: !sourceRelativePathWithFilename! To !destinyRelativeFolderWithoutName!!fileName!
    rem Generate the hash and store it next to the js file name in the hashes.txt file
    set "hash="
    for /f %%H in ('certutil -hashfile "!destinyRelativeFolderWithoutName!!fileName!" MD5 ^| find /v ":"') do set "hash=%%H"
    echo !fileName!:!hash! >> %hashesFile%
)
echo Minification process completed successfully
echo Press any key to close
pause