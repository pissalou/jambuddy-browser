cmake_minimum_required(VERSION 3.16)

project(hello VERSION 1.0 LANGUAGES CXX)

#[[We replace Core with Quick. This will locate the Qt6Quick module and provide the Qt6::Quick targets we later link against.]]
find_package(Qt6 6.2 COMPONENTS Quick Gui REQUIRED)

#[[We call qt_standard_project_setup, and specify CMAKE_CXX_STANDARD, and CMAKE_CXX_STANDARD_REQUIRED. By passing REQUIRES 6.5
to qt_standard_project_setup, we opt-in to useful defaults for qt_add_qml_module. It enables all the Qt CMake policies up to version 6.5, in
particular QTP0001 that defines a sane default resource prefix for QML modules.]]
qt_standard_project_setup(REQUIRES 6.5)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
#[[Note that the application will still link against Qt6::Core, because Qt6::Quick depends on it.]]

qt_add_executable(myapp
    main.cpp
)

#[[qt_add_qml_module passes the target of the executable, a URI, module version, and a list of QMLfiles to ensure that myapp becomes a QML
module. This places the QML files into qrc:/qt/qml/${URI} in the resource file system. Moreover, qt_add_qml_module ensures that
qmlcachegen runs. Additionally, it creates a myapp_qmllint target, which runs qmllint on the files in QML_FILES.]]
qt_add_qml_module(myapp
    URI hello
    QML_FILES
        piano.qml
)

#[[In the target_link_libraries command, we link against Qt6::Quick instead of Qt6::Core.]]
target_link_libraries(myapp PRIVATE Qt6::Gui Qt6::Quick)