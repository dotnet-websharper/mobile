rem @echo off
rem Copyright (C) 2007 The Android Open Source Project
rem
rem Licensed under the Apache License, Version 2.0 (the "License");
rem you may not use this file except in compliance with the License.
rem You may obtain a copy of the License at
rem
rem      http://www.apache.org/licenses/LICENSE-2.0
rem
rem Unless required by applicable law or agreed to in writing, software
rem distributed under the License is distributed on an "AS IS" BASIS,
rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
rem See the License for the specific language governing permissions and
rem limitations under the License.

rem don't modify the caller's environment
setlocal

rem Set up prog to be the path of this script, including following symlinks,
rem and set up progdir to be the fully-qualified pathname of its directory.
set prog=%~f0

rem Change current directory and drive to where the script is, to avoid
rem issues with directories containing whitespaces.
cd /d %~dp0

set jarfile=sdklib.jar
set frameworkdir=

if exist %frameworkdir%lib\find_java.bat goto FoundLib
	set frameworkdir=%ANDROID_HOME%\
	
if exist %frameworkdir%lib\find_java.bat goto FoundLib
	set frameworkdir=%ANDROID_SDK%\

rem Check we have a valid Java.exe in the path.

:FoundLib
set java_exe=
call %frameworkdir%lib\find_java.bat 1>&2
if not defined java_exe goto :EOF

if exist %frameworkdir%%jarfile% goto JarFileOk
    set frameworkdir=lib\

if exist %frameworkdir%%jarfile% goto JarFileOk
    set frameworkdir=..\framework\

if exist %frameworkdir%%jarfile% goto JarFileOk
    set frameworkdir=%ANDROID_HOME%\lib\
	
if exist %frameworkdir%%jarfile% goto JarFileOk
    set frameworkdir=%ANDROID_SDK%\lib\
	
:JarFileOk

set jarpath=%frameworkdir%%jarfile%

call %java_exe% -classpath %jarpath% com.android.sdklib.build.ApkBuilderMain %*
