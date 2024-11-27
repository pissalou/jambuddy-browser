import QtQuick 2.12

Rectangle {
  width: 300; height: 150 // size of the canvas in emscripten
  Row {
      Repeater {
          model: 7
          Rectangle {
              width: 42; height: 150
              border.width: 1
              border.color: "gray"
              color: "ivory"
          }
      }
  }

  Row {
      x: 32
      spacing: 21
      Repeater {
          model: 6
          Rectangle {
              width: 21; height: 80
              enabled: index != 2
              border.width: 1
              border.color: index != 2 ? "black" : "transparent"
              color: index != 2 ? "black" : "transparent"
          }
      }
  }
}

