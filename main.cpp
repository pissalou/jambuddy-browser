#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char **argv) {
    QGuiApplication app(argc, argv);
    QQmlApplicationEngine engine("qrc:/qt/qml/hello");
    //return app.exec();
    // The exec() call above normally blocks and processes events until application shutdown. Unfortunately this is not possible
    //on the web platform where blocking the main thread is not allowed. Instead, control must be returned to the browser's event loop after processing each event.
    return 0;
}