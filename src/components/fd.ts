//рисование стрелок между планетами
DrawFormulaClass.prototype.draw_arrows = function (number, planets_coords) {
  //для двухпланетных центров
  if (number === 2) {
    this.draw_arrow(
      planets_coords[0][0],
      planets_coords[0][1],
      planets_coords[1][0],
      planets_coords[1][1],
      true
    );
    return;
  }

  for (let i = 0; i < number - 1; i++) {
    this.draw_arrow(
      planets_coords[i][0],
      planets_coords[i][1],
      planets_coords[i + 1][0],
      planets_coords[i + 1][1]
    );
  }

  this.draw_arrow(
    planets_coords[number - 1][0],
    planets_coords[number - 1][1],
    planets_coords[0][0],
    planets_coords[0][1]
  );
};

DrawFormulaClass.prototype.draw_contour = function (
  number,
  planets_coords,
  height,
  width
) {
  let x, y;

  switch (number) {
    case 1:
      x = planets_coords[0][0] - 15;
      y = planets_coords[0][1] - 10;
      break;

    case 2:
      x = planets_coords[1][0] - 15;
      y = planets_coords[0][1] - 10;
      break;

    case 3:
      x = planets_coords[2][0] - 15;
      y =
        (planets_coords[2][1] < planets_coords[0][1]
          ? planets_coords[2][1]
          : planets_coords[0][1]) - 20;
      break;

    case 4:
      x = planets_coords[3][0] - 15;
      y = planets_coords[3][1] - 10;
      break;

    case 5:
      x = planets_coords[4][0] - 15;
      y =
        (planets_coords[4][1] < planets_coords[0][1]
          ? planets_coords[4][1]
          : planets_coords[0][1]) - 20;
      break;

    case 6:
      x = planets_coords[5][0] - 10;
      y = planets_coords[5][1] - 20;
      break;

    case 7:
      x = planets_coords[6][0] - 15;
      y =
        (planets_coords[6][1] < planets_coords[0][1]
          ? planets_coords[6][1]
          : planets_coords[0][1]) - 20;
      break;

    case 8:
      x = planets_coords[7][0] - 10;
      y = planets_coords[7][1] - 20;
      break;

    case 9:
      x = planets_coords[8][0] - 10;
      y = planets_coords[0][1] - 20;
      break;

    case 10:
      x = planets_coords[8][0] - 10;
      y = planets_coords[0][1] - 20;
      break;

    default:
      x = NaN;
      y = NaN;
  }

  //обводим цетр
  svg
    .append("rect")
    .attr("height", height + 20)
    .attr("width", width + 15)
    .attr("x", x)
    .attr("y", y)
    .attr("rx", 15)
    .attr("ry", 15)
    .attr("fill", "none")
    .attr("stroke", "black");
};

//Циклический сдвиг массива
//принимает на вход массив с количеством элементов от 2 до 10
//второй параметр  - на сколько элементов сдвинуть
//движение производится вперед по часовой стрелке по кругу
//если элемента 2, то они просто меняются местами
//возвращает измененный массив
DrawFormulaClass.prototype.move_array = function (array, number_to_move) {
  /*
  a=a.splice(-k).concat(a);
  
  The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
  
  start
  Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to
  the length of the array. If negative, will begin that many elements from the end of the array (with origin -1)
  
  The concat() method is used to merge two or more arrays. This method does not change the existing arrays,
  but instead returns a new array.and will be set to 0 if absolute value is greater than the length of the array.
  
  so for example
  let a =[1,2,3];
  a.splice(-1) === 3
  a=a.splice(-1).concat(a) === 3 + 1,2
  */

  if (array.length < 2) {
    console.log("array is to small");
    throw "093";
  }

  //insurance against error in 2 elements array
  if (array.length === 2) number_to_move = 1;

  return array.splice(-number_to_move).concat(array);
};

//ищет в массиве центров планеты, на которые указывает максимум 1 планета,
//для того чтобы можно было съэкономить место на орбитах и рисовать такую планету слева на формуле.
DrawFormulaClass.prototype.find_horizontal = function (array, formula_array) {
  let planet_horizontal = [];

  //изначально устанавливаем на все планеты, что они могут рисоваться слева
  for (let i = 0; i < array.length; i++) {
    planet_horizontal[i] = true;
  }

  //теперь отсекаем варианты
  for (let key in formula_array) {
    for (let i = 0; i < array.length; i++) {
      //console.log(formula_array[key].point_to_planet);

      if (
        array[i] === formula_array[key].point_to_planet &&
        formula_array[key].orbit === 1 &&
        planet_horizontal[i]
      ) {
        for (let key2 in formula_array) {
          if (
            key === formula_array[key2].point_to_planet &&
            formula_array[key2].orbit === 2 &&
            planet_horizontal[i]
          ) {
            // console.log(key);
            // console.log(formula_array[key2].point_to_planet);
            planet_horizontal[i] = false;
          }
        }
      }
    }
  }

  return planet_horizontal;
};

//находит следующую планету, которая указывает на текущую
//либо возвращает false
DrawFormulaClass.prototype.find_next_planet = function (planet, formula_array) {
  for (let key in formula_array) {
    if (
      planet === formula_array[key].point_to_planet &&
      !this.planets_full_info[key].drawn &&
      formula_array[planet].orbit === formula_array[key].orbit - 1
    ) {
      return key;
    }
  }
  return false;
};

//находит предыдущую планету, на которую указывает текущая
//либо возвращает false если планета, на которую она указывает, находится в центре формулы
DrawFormulaClass.prototype.find_prev_planet = function (planet, formula_array) {
  let points_to = formula_array[planet].point_to_planet;

  if (formula_array[points_to].orbit !== 0) {
    //console.log(`points_to = ${points_to}`);
    return points_to;
  }

  return false;
};

//рисуем формулу души и тела
//входные аргументы
//formula.personality и formula.per_centers
//или
//formula.design и formula.des_centers
DrawFormulaClass.prototype.draw_Fd = function (formula_array, centers_array) {
  //y - левый верхний край планеты
  //x - точно посередине

  //   console.log("this.draw_Fd");
  //   console.log(formula_array);
  //   console.log(centers_array);

  for (let key in this.planets_full_info) {
    //console.log(key);
    this.planets_full_info[key].x = NaN;
    this.planets_full_info[key].y = NaN;
    this.planets_full_info[key].drawn = false;
  }

  let pers_x = this.pers_x;
  let pers_y = this.pers_y;

  //окантовка для Формулы Души
  svg
    .append("rect")
    .attr("height", height - 200) //550
    .attr("width", width)
    .attr("x", pers_x)
    .attr("y", pers_y)
    .attr("fill", "none")
    .attr("stroke", "black");

  let temp_y = pers_y + 60;

  let temp_x = 0;

  let points = [
    { x: pers_x, y: temp_y },
    { x: pers_x + width, y: temp_y },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  temp_x += 60;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  temp_x += 120;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  this.draw_planet(
    "mercury",
    pers_x + 30,
    pers_y + 15,
    this.size_of_the_planet_to_draw,
    "blue"
  );
  //рисуем силу и ретроградность
  this.draw_power_and_retro(
    "mercury",
    [pers_x + 30, pers_y + 15],
    "blue",
    formula_array
  );
  this.draw_planet(
    "mercury",
    pers_x + temp_x + 30,
    pers_y + 15,
    this.size_of_the_planet_to_draw,
    "blue"
  );
  //рисуем силу и ретроградность
  this.draw_power_and_retro(
    "mercury",
    [pers_x + temp_x + 30, pers_y + 15],
    "blue",
    formula_array
  );
  let temp_i = 2;
  for (let i = 2; i <= 8; i++) {
    temp_x += 60;

    points = [
      { x: pers_x + temp_x, y: pers_y },
      { x: pers_x + temp_x, y: pers_y + height - 200 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "black")
      .attr("fill", "none");

    //пропускаем Землю
    if (i === 3) temp_i++;
    this.draw_planet(
      planets_arr[temp_i],
      pers_x + temp_x + 30,
      pers_y + 15,
      this.size_of_the_planet_to_draw,
      "blue"
    );
    //рисуем силу и ретроградность
    this.draw_power_and_retro(
      planets_arr[temp_i],
      [pers_x + temp_x + 30, pers_y + 15],
      "blue",
      formula_array
    );

    temp_i++;
  }

  temp_x += 60;

  points = [
    { x: pers_x + temp_x, y: pers_y },
    { x: pers_x + temp_x, y: pers_y + height - 200 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  //устанавливаем минимальную занимаемую высоту центра
  // и его ориентацию
  //для одиночных центров это всегда константа

  for (let i = 0; i < centers_array.length; i++) {
    if (centers_array[i][1] === 1) {
      centers_array[i][2] = [40, "horizontal"];
    }

    //2 планеты рисуются либо вертикально, либо горизонтально
    // и от этого зависит высота 40 или 80
    //если горизонтально, то первая планета будет нарисована слева
    if (centers_array[i][1] === 2) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (!planet_horizontal[0] && !planet_horizontal[1]) {
        centers_array[i][2] = [80, "vertical"];
      } else {
        centers_array[i][2] = [40, "horizontal"];
        //меняем местами
        if (planet_horizontal[0]) {
          centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          // console.log(centers_array[i][0]);
        }
      }
    }

    //3 планеты рисуются либо квадратно, либо левая выше
    // и от этого зависит высота 80 (horizontal) или
    // 120 (vertical)
    if (centers_array[i][1] === 3) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2]
      ) {
        centers_array[i][2] = [120, "vertical"];
      } else {
        centers_array[i][2] = [80, "horizontal"];

        //меняем местами
        //1 справа наверху,2 справа внизу, 3 слева внизу
        if (!planet_horizontal[2]) {
          if (planet_horizontal[0]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          }
        }
      }
    }

    //4 планеты рисуются либо квадратно, либо левые выше и ниже
    // и от этого зависит высота 80 или 120 или 160
    // 120 одна сзади рисуется вверх
    if (centers_array[i][1] === 4) {
      //console.log(centers_array[i][0]);

      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      //console.log(planet_horizontal);

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3]
      ) {
        centers_array[i][2] = [160, "vertical"];
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [80, "horizontal"];

        if (!(planet_horizontal[2] && planet_horizontal[3])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3]
      ) {
        //одна горизонтальная ставим ее сзади внизу
        centers_array[i][2] = [120, "vertical"];

        if (!planet_horizontal[2]) {
          if (planet_horizontal[0]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[1]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [80, "horizontal"];
      }
    }

    //5 планет рисуются либо прямоугольно, 3 спереди 2 сзади внизу 120
    // либо 3 спереди одна сзади и одна сзади вверх 160
    // либо 3 спереди и 2 сзади вверху и внизу 200
    if (centers_array[i][1] === 5) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4]
      ) {
        centers_array[i][2] = [200, "vertical"];
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [120, "horizontal"];

        if (!(planet_horizontal[3] && planet_horizontal[4])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4]
      ) {
        //одна горизонтальная ставим ее сзади внизу
        centers_array[i][2] = [160, "vertical"];

        if (!planet_horizontal[3]) {
          if (planet_horizontal[0]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [120, "horizontal"];
      }
    }

    //6 планет рисуются либо прямоугольно,
    // для орбит остается всего 4 планеты +Земля и узлы = 7
    // 3 спереди 3 сзади = 120
    // либо 3 спереди две сзади,  и  одна сзади вверх 160
    // либо 3 спереди  одна сзади, и 2 сзади вверху и внизу 200
    if (centers_array[i][1] === 6) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5]
      ) {
        centers_array[i][2] = [200, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //6 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 6 planets in Center`);
        throw 63333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[0]) ||
        (planet_horizontal[5] && planet_horizontal[0] && planet_horizontal[1])
      ) {
        //3 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [120, "horizontal"];

        if (
          !(
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[0]
          ) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[5]) ||
        (planet_horizontal[5] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (!(planet_horizontal[3] && planet_horizontal[4])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (planet_horizontal[4] && planet_horizontal[5]) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4] ||
        planet_horizontal[5]
      ) {
        //одна горизонтальная ставим ее сзади по центру
        centers_array[i][2] = [200, "vertical"];

        if (!planet_horizontal[4]) {
          if (planet_horizontal[0]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[1]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[2]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[3]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [120, "horizontal"];
      }
    }

    //7 планет рисуются либо прямоугольно,
    //4 планеты спереди, 3 сзади
    // для орбит остается всего 3 планеты +Земля и узлы = 6
    // 4 спереди 3 сзади = 160
    // либо 4 спереди две сзади,  и  одна сзади вверх 200
    // либо 4 спереди  одна сзади, и 2 сзади вверху и внизу 240
    if (centers_array[i][1] === 7) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5] &&
        !planet_horizontal[6]
      ) {
        centers_array[i][2] = [240, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //7 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 7 planets in Center`);
        throw 73333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6]) ||
        (planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[0]) ||
        (planet_horizontal[6] && planet_horizontal[0] && planet_horizontal[1])
      ) {
        //3 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[0]
          ) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else if (
        (planet_horizontal[0] && planet_horizontal[1]) ||
        (planet_horizontal[1] && planet_horizontal[2]) ||
        (planet_horizontal[2] && planet_horizontal[3]) ||
        (planet_horizontal[3] && planet_horizontal[4]) ||
        (planet_horizontal[4] && planet_horizontal[5]) ||
        (planet_horizontal[5] && planet_horizontal[6]) ||
        (planet_horizontal[6] && planet_horizontal[0])
      ) {
        //2 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [200, "vertical"];

        if (!(planet_horizontal[4] && planet_horizontal[5])) {
          if (planet_horizontal[0] && planet_horizontal[1]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[1] && planet_horizontal[2]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[2] && planet_horizontal[3]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[3] && planet_horizontal[4]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (planet_horizontal[5] && planet_horizontal[6]) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      } else if (
        planet_horizontal[0] ||
        planet_horizontal[1] ||
        planet_horizontal[2] ||
        planet_horizontal[3] ||
        planet_horizontal[4] ||
        planet_horizontal[5] ||
        planet_horizontal[6]
      ) {
        //одна горизонтальная ставим ее сзади по центру
        centers_array[i][2] = [240, "vertical"];

        if (!planet_horizontal[5]) {
          if (planet_horizontal[0]) {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          } else if (planet_horizontal[1]) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (planet_horizontal[2]) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (planet_horizontal[3]) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (planet_horizontal[4]) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          }
        }
      } else {
        //все горизонтальны, порядок не имеет значения
        centers_array[i][2] = [160, "horizontal"];
      }
    }

    //8 планет рисуются либо прямоугольно,
    //4 планеты спереди, 4 сзади
    // для орбит остается всего 2 планеты +Земля и узлы = 5
    // то есть в любом случае есть минимум 3 горизонтальные подряд
    // если 4 горизонтальные, что имеет огромную вероятность то 160
    // если 4 спереди и одна сзади наверх то 200
    if (centers_array[i][1] === 8) {
      let planet_horizontal = this.find_horizontal(
        centers_array[i][0],
        formula_array
      );

      if (
        !planet_horizontal[0] &&
        !planet_horizontal[1] &&
        !planet_horizontal[2] &&
        !planet_horizontal[3] &&
        !planet_horizontal[4] &&
        !planet_horizontal[5] &&
        !planet_horizontal[6] &&
        !planet_horizontal[7]
      ) {
        centers_array[i][2] = [200, "vertical"];
        //такой ситуации даже гипотетически не должно возникнуть
        //7 планет в центре и все с длинными орбитами ?
        console.log(`draw_Fd 8 planets in Center`);
        throw 83333333333333;
      } else if (
        (planet_horizontal[0] &&
          planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3]) ||
        (planet_horizontal[1] &&
          planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4]) ||
        (planet_horizontal[2] &&
          planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5]) ||
        (planet_horizontal[3] &&
          planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6]) ||
        (planet_horizontal[4] &&
          planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[7]) ||
        (planet_horizontal[5] &&
          planet_horizontal[6] &&
          planet_horizontal[7] &&
          planet_horizontal[0]) ||
        (planet_horizontal[6] &&
          planet_horizontal[7] &&
          planet_horizontal[0] &&
          planet_horizontal[1])
      ) {
        //4 подряд горизонтальны, переводим их назад
        centers_array[i][2] = [160, "horizontal"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[7]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[7] &&
            planet_horizontal[0]
          ) {
            //двигаем на 7 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 7);
          } else {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          }
        }
      } else {
        //3 подряд горизонтальные есть в любом случае , переводим их назад
        centers_array[i][2] = [200, "vertical"];

        if (
          !(
            planet_horizontal[4] &&
            planet_horizontal[5] &&
            planet_horizontal[6]
          )
        ) {
          if (
            planet_horizontal[0] &&
            planet_horizontal[1] &&
            planet_horizontal[2]
          ) {
            //двигаем на 4 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 4);
          } else if (
            planet_horizontal[1] &&
            planet_horizontal[2] &&
            planet_horizontal[3]
          ) {
            //двигаем на 3 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 3);
          } else if (
            planet_horizontal[2] &&
            planet_horizontal[3] &&
            planet_horizontal[4]
          ) {
            //двигаем на 2 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 2);
          } else if (
            planet_horizontal[3] &&
            planet_horizontal[4] &&
            planet_horizontal[5]
          ) {
            //двигаем на 1 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 1);
          } else if (
            planet_horizontal[5] &&
            planet_horizontal[6] &&
            planet_horizontal[0]
          ) {
            //двигаем на 6 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 6);
          } else {
            //двигаем на 5 вправо
            centers_array[i][0] = this.move_array(centers_array[i][0], 5);
          }
        }
      }
    }

    //9 планет, рисуются 5 спереди 4 сзади
    //смысла что-то искать и перестраивать нет
    if (centers_array[i][1] === 9) {
      centers_array[i][2] = [200, "horizontal"];
    }

    //10 планет, рисуются 5 спереди 5 сзади
    //смысла что-то искать и перестраивать нет
    if (centers_array[i][1] === 10) {
      centers_array[i][2] = [200, "horizontal"];
    }
  }
  //console.log(centers_array);

  pers_x = this.pers_x;
  pers_y = this.pers_y;

  //две колонки рисования для многопланетных центров
  const first_column_x = pers_x + 60 + 30;
  const second_column_x = pers_x + 60 + 10 + 40 + 30;

  const start_center_y = pers_y + 60 + 5;
  const end_center_y = pers_y + height - 200 - 5;

  //750-200   - 60 - 10 = 480 /40 = 12 планет помещается по вертикали
  //60 - верхняя кромка с орбитами,
  //10 - запас по 5 с каждой стороны
  const vertical_size = end_center_y - start_center_y;

  const center_center = start_center_y + vertical_size / 2;

  //границы занятой высоты, изменяются по мере заполнения центрами
  let upper_y_border = Math.trunc(start_center_y + vertical_size / 2);
  let lower_y_border = Math.trunc(start_center_y + vertical_size / 2);

  /*
      есть массив centers_array
      он отсортирован по убыванию величины центров
      в каждом центре планеты осортированы по куруг указания друг на друга
      так же отсортированы по расположению планет для рисования длинных орбит вправо
      а без орбит - влево
  
      [0]-ой элемент - список планет
      [1]-ый элемент - количество планет в центре
      [2]-ой элемент - минимальный размер и горизонтальное/вертикальное расположение
  
  
      минимальный размер по итогу надо сделать в каких-то условных единицах и затем масштабировать при рисовании
      размер планет в центре и расстояние между ними также сделать в условных единицах
  
  
      теперь корректируем расстояния между центрами и между планетами в центрах, отталкиваясь
      от
      //высота
      //750-200   - 60 - 10 = 480 /40 = 12 планет помещается по вертикали
      //60 - верхняя кромка с орбитами,
      //10 - запас по 5 с каждой стороны
       */

  let sum_of_planets_heights = 0;

  //промежуток по вертикали между центрами
  let gap_between_centers = 40;

  //промежуток по вертикали между планетами
  let gap_between_planets = 0;

  //количество центров centers_array.length
  // количество промежутков между центрами centers_array.length +1
  //так как у первого цетра промежутки с двух сторон и у крайних тоже должны быть промежутки вверху и внизу соответственно
  // в расчет не надо брать одиночные центры, так как их нет смысла увеличивать, но надо брать в расчет промежутки между ними.
  let number_of_centers_to_increase_space = 0;

  const number_of_gaps_between = centers_array.length + 1;

  for (let i = 0; i < centers_array.length; i++) {
    //суммируем все цифры того, сколько занимает каждый центр по вертикали.
    sum_of_planets_heights += centers_array[i][2][0];

    //добавляем промежутки между центрами
    if (i === 0) {
      sum_of_planets_heights += gap_between_centers * 2;
    } else {
      sum_of_planets_heights += gap_between_centers;
    }

    //не увеличиваем одиночные центры и горизонтальные двойные
    if (
      centers_array[i][1] !== 1 &&
      centers_array[i][1] === 2 &&
      centers_array[i][2][0] !== 40
    ) {
      number_of_centers_to_increase_space++;
    }
  }

  // console.log(sum_of_planets_heights);
  // console.log(vertical_size);

  //имеем размер вертикальный и имеем сколько из этого размера занимают центры и промежутки между ними
  // теперь в процентном сотношении, кратном 40 увеличиваем и то и то.
  // -1 потому-что мы строим от центра и там одна планета попадает посередине занимая 20 с одной стороны и 20 с другой
  let free_space_in_40 =
    Math.trunc((vertical_size - sum_of_planets_heights) / 40) - 1;

  //если не хватает места, уменьшаем промежутки между центрами
  if (!free_space_in_40) {
    console.log(`Not enough space for centers`);
  }

  // console.log(free_space_in_40);

  while (
    free_space_in_40 >
    number_of_centers_to_increase_space + number_of_gaps_between
  ) {
    gap_between_centers += 40;
    gap_between_planets += 40;

    // console.log(free_space_in_40);
    // console.log(number_of_centers_to_increase_space);

    free_space_in_40 -=
      number_of_centers_to_increase_space + number_of_gaps_between;
  }

  pers_x = first_column_x;
  pers_y = start_center_y;

  //массив уже отсортирован и идет от больших центров к маленьким
  for (let i = 0; i < centers_array.length; i++) {
    //console.log(`centers_array[i][0] = ${centers_array[i][0]}`);

    //координаты планет x и y
    let planets_coords = [];

    //добавляем дополнительное пространство для планет
    //не увеличиваем одиночные центры и горизонтальные двойные
    if (
      (centers_array[i][1] === 2 && centers_array[i][2][0] !== 40) ||
      centers_array[i][1] > 2
    ) {
      centers_array[i][2][0] += gap_between_planets;
    }

    //10 планет
    if (centers_array[i][0].length === 10) {
      //10 планет, рисуются 5 спереди 5 сзади
      //смысла что-то искать и перестраивать нет
      //centers_array[i][2] = [200,"horizontal"];

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[1] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[2] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[3] = [second_column_x, center_center];

        planets_coords[4] = [
          second_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [first_column_x, center_center];

        planets_coords[7] = [
          first_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[8] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[9] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][0] / 5) * 3 -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][0] / 5) * 2 +
          gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        planets_coords[1] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[2] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[3] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[4] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[7] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[8] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[9] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[3] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[4] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[5] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[6] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[7] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[8] = [
          first_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[9] = [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        10,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(10, planets_coords);
      this.draw_contour(10, planets_coords, centers_array[i][2][0], 80);
    }

    //9 планет
    if (centers_array[i][0].length === 9) {
      //9 планет, рисуются 5 спереди 4 сзади
      //смысла что-то искать и перестраивать нет
      //centers_array[i][2] = [200,"horizontal"];

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[1] = [
          second_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[2] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[3] = [second_column_x, center_center];

        planets_coords[4] = [
          second_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          center_center + centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [first_column_x, center_center];

        planets_coords[7] = [
          first_column_x,
          center_center - centers_array[i][2][0] / 5,
        ];

        planets_coords[8] = [
          first_column_x,
          center_center - (centers_array[i][2][0] / 5) * 2,
        ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][0] / 5) * 3 -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][0] / 5) * 2 +
          gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        planets_coords[1] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[2] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[3] = [
          second_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[4] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[5] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0] / 5,
        ];

        planets_coords[6] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[7] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[8] = [
          first_column_x,
          upper_y_border - (centers_array[i][2][0] / 5) * 4,
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[3] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[4] = [
          second_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[5] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 4,
        ];

        planets_coords[6] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 3,
        ];

        planets_coords[7] = [
          first_column_x,
          lower_y_border + (centers_array[i][2][0] / 5) * 2,
        ];

        planets_coords[8] = [
          first_column_x,
          lower_y_border + centers_array[i][2][0] / 5,
        ];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        9,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(9, planets_coords);
      this.draw_contour(9, planets_coords, centers_array[i][2][0], 80);
    }

    //8 планет
    if (centers_array[i][0].length === 8) {
      //8 планет рисуются либо прямоугольно,
      //4 планеты спереди, 4 сзади
      // для орбит остается всего 2 планеты +Земля и узлы = 5
      // то есть в любом случае есть минимум 3 горизонтальные подряд

      // если 4 горизонтальные, что имеет огромную вероятность то 160
      // если 4 спереди и одна сзади наверх то 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                center_center - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 5]
            : [second_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 5 - 40]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 4 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                center_center + (centers_array[i][2][0] / 5) * 2 - 40,
              ]
            : [
                second_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                center_center + (centers_array[i][2][0] / 5) * 2 - 40,
              ]
            : [
                first_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center + centers_array[i][2][0] / 5 - 40]
            : [first_column_x, center_center + centers_array[i][2][0] / 4 - 40];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - centers_array[i][2][0] / 5]
            : [first_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - (centers_array[i][2][0] / 5) * 3]
            : [
                first_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? (centers_array[i][2][0] / 5) * 3
            : (centers_array[i][2][0] / 4) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? (centers_array[i][2][0] / 5) * 2
            : (centers_array[i][2][0] / 4) * 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 4,
              ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - centers_array[i][2][0]];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [second_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 3,
              ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 5) * 2,
              ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[7] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        8,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(8, planets_coords);
      this.draw_contour(8, planets_coords, centers_array[i][2][0], 80);
    }

    //7 планет
    if (centers_array[i][0].length === 7) {
      // для орбит остается всего 3 планеты +Земля и узлы = 6
      //7 планет рисуются либо прямоугольно,
      //4 планеты спереди, 3 сзади

      // 4 спереди 3 сзади = 160
      // либо 4 спереди две сзади,  и  одна сзади вверх 200
      // либо 4 спереди  одна сзади, и 2 сзади вверху и внизу 240

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 6) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [second_column_x, center_center - centers_array[i][2][0] / 6]
              : [second_column_x, center_center - centers_array[i][2][0] / 5]
            : [second_column_x, center_center - centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 6 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 4 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  center_center + (centers_array[i][2][0] / 6) * 2 - 40,
                ]
              : [
                  second_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
            : [
                second_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 6) * 3 - 40,
                ]
              : [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
            : [
                first_column_x,
                center_center + (centers_array[i][2][0] / 4) * 2 - 40,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 6 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 4 - 40];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 4];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? (centers_array[i][2][0] / 6) * 3
              : (centers_array[i][2][0] / 5) * 3
            : (centers_array[i][2][0] / 4) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 240
              ? (centers_array[i][2][0] / 6) * 3
              : (centers_array[i][2][0] / 5) * 2
            : (centers_array[i][2][0] / 4) * 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 5,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 6]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 4];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 4) * 3,
              ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 6]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 4];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                second_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 4,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 4,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
              : [first_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 6) * 3,
                ]
              : [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
            : [
                first_column_x,
                lower_y_border + (centers_array[i][2][0] / 4) * 2,
              ];

        planets_coords[6] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 240
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 4];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        7,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(7, planets_coords);
      this.draw_contour(7, planets_coords, centers_array[i][2][0], 80);
    }

    //6 планет
    if (centers_array[i][0].length === 6) {
      //6 планет рисуются либо прямоугольно,
      // для орбит остается всего 4 планеты +Земля и узлы = 7
      // 3 спереди 3 сзади = 120
      // либо 3 спереди две сзади,  и  одна сзади вверх 160
      // либо 3 спереди  одна сзади, и 2 сзади вверху и внизу 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, center_center - centers_array[i][2][0] / 5]
              : [second_column_x, center_center - centers_array[i][2][0] / 4]
            : [second_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 3 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 3 - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, center_center - centers_array[i][2][0] / 5]
              : [first_column_x, center_center - centers_array[i][2][0] / 4]
            : [first_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 3,
                ]
            : [
                first_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 3
              : (centers_array[i][2][0] / 4) * 3
            : (centers_array[i][2][0] / 3) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 2
              : (centers_array[i][2][0] / 4) * 2
            : centers_array[i][2][0] / 3 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - centers_array[i][2][0]];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border + centers_array[i][2][0]]
              : [first_column_x, lower_y_border + centers_array[i][2][0]]
            : [first_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  first_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[5] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        6,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(6, planets_coords);
      this.draw_contour(6, planets_coords, centers_array[i][2][0], 80);
    }

    //5 планет
    if (centers_array[i][0].length === 5) {
      //5 планет рисуются либо прямоугольно, 3 спереди 2 сзади внизу 120
      // либо 3 спереди одна сзади и одна сзади вверх 160
      // либо 3 спереди и 2 сзади вверху и внизу 200

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                center_center - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, center_center - centers_array[i][2][0] / 5]
              : [second_column_x, center_center - centers_array[i][2][0] / 4]
            : [second_column_x, center_center - centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 5 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 3 - 40,
              ];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center + (centers_array[i][2][0] / 5) * 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 3 - 40];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 4) * 3,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 3];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 3
              : (centers_array[i][2][0] / 4) * 3
            : (centers_array[i][2][0] / 3) * 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border + (centers_array[i][2][1] === "vertical")
            ? centers_array[i][2][0] === 200
              ? (centers_array[i][2][0] / 5) * 2
              : (centers_array[i][2][0] / 4) * 2
            : centers_array[i][2][0] / 3 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 4,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 2,
                ]
            : [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 5) * 2,
                ]
              : [second_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0] / 5]
              : [first_column_x, upper_y_border - centers_array[i][2][0] / 4]
            : [first_column_x, upper_y_border - centers_array[i][2][0] / 3];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, upper_y_border - centers_array[i][2][0]]
              : [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [
                first_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 5]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 2,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] / 3];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 5) * 3,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border + centers_array[i][2][0]]
              : [first_column_x, lower_y_border + centers_array[i][2][0]]
            : [first_column_x, lower_y_border + centers_array[i][2][0]];

        planets_coords[4] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 200
              ? [first_column_x, lower_y_border]
              : [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] / 3];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        5,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(5, planets_coords);
      this.draw_contour(5, planets_coords, centers_array[i][2][0], 80);
    }

    //4 планеты
    if (centers_array[i][0].length === 4) {
      //4 планеты рисуются либо квадратно, либо левые выше и ниже
      // и от этого зависит высота 80 или 120 или 160
      // 120 одна сзади рисуется вверх

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу

      /*
              console.log(centers_array[i][2][1]);
              console.log(centers_array[i][2][0]);
              console.log(formula_array["pluto"].point_to_planet);
              console.log(formula_array["pluto"].orbit);
              console.log(formula_array["earth"].point_to_planet);
              console.log(formula_array["earth"].orbit);
              */

      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [second_column_x, center_center - centers_array[i][2][0] / 4]
              : [second_column_x, center_center - centers_array[i][2][0] / 3]
            : [second_column_x, center_center - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 4 - 40,
                ]
              : [
                  second_column_x,
                  center_center + centers_array[i][2][0] / 3 - 40,
                ]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 2 - 40,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 2 - 40,
                ]
              : [
                  first_column_x,
                  center_center + centers_array[i][2][0] / 3 - 40,
                ]
            : [first_column_x, center_center + centers_array[i][2][0] / 2 - 40];

        planets_coords[3] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [first_column_x, center_center - centers_array[i][2][0] / 2]
              : [
                  first_column_x,
                  center_center - (centers_array[i][2][0] / 3) * 2,
                ]
            : [first_column_x, center_center - centers_array[i][2][0] / 2];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? centers_array[i][2][0] / 2
              : (centers_array[i][2][0] / 3) * 2
            : centers_array[i][2][0] / 2) -
          gap_between_centers;

        lower_y_border =
          lower_y_border +
          (centers_array[i][2][1] === "vertical" &&
            centers_array[i][2][0] === 120)
            ? centers_array[i][2][0] / 3
            : centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 4) * 3,
                ]
              : [
                  second_column_x,
                  upper_y_border - (centers_array[i][2][0] / 3) * 2,
                ]
            : [second_column_x, upper_y_border - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  upper_y_border - centers_array[i][2][0] / 4 - 40,
                ]
              : [
                  second_column_x,
                  upper_y_border - centers_array[i][2][0] / 3 - 40,
                ]
            : [second_column_x, upper_y_border - 40];

        planets_coords[2] = [first_column_x, upper_y_border - 40];

        planets_coords[3] = [
          first_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [second_column_x, lower_y_border + centers_array[i][2][0] / 4]
              : [second_column_x, lower_y_border + centers_array[i][2][0] / 3]
            : [second_column_x, lower_y_border];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? centers_array[i][2][0] === 160
              ? [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 4) * 3 - 40,
                ]
              : [
                  second_column_x,
                  lower_y_border + (centers_array[i][2][0] / 3) * 2,
                ]
            : [second_column_x, lower_y_border + centers_array[i][2][0] - 40];

        planets_coords[2] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] - 40,
        ];

        planets_coords[2] = [second_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        4,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(4, planets_coords);
      this.draw_contour(4, planets_coords, centers_array[i][2][0], 80);
    }

    //3 планеты
    if (centers_array[i][0].length === 3) {
      //3 планеты рисуются либо квадратно, либо левая выше
      // и от этого зависит высота 80 (horizontal) или
      // 120 (vertical)

      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 3]
            : [second_column_x, center_center - centers_array[i][2][0] / 2];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 3 - 40]
            : [
                second_column_x,
                center_center + centers_array[i][2][0] / 2 - 40,
              ];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, center_center - (centers_array[i][2][0] / 3) * 2]
            : [first_column_x, center_center + centers_array[i][2][0] / 2 - 40];

        upper_y_border =
          upper_y_border -
          (centers_array[i][2][1] === "vertical"
            ? (centers_array[i][2][0] / 3) * 2
            : centers_array[i][2][0] / 2) -
          gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [
                second_column_x,
                upper_y_border - (centers_array[i][2][0] / 3) * 2,
              ]
            : [second_column_x, upper_y_border - centers_array[i][2][0]];

        planets_coords[1] = [second_column_x, upper_y_border - 40];

        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, upper_y_border - centers_array[i][2][0]]
            : [first_column_x, upper_y_border - 40];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] / 3]
            : [second_column_x, lower_y_border];
        planets_coords[1] = [
          second_column_x,
          lower_y_border + centers_array[i][2][0] - 40,
        ];
        planets_coords[2] =
          centers_array[i][2][1] === "vertical"
            ? [first_column_x, lower_y_border]
            : [first_column_x, lower_y_border + centers_array[i][2][0] - 40];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        3,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(3, planets_coords);
      this.draw_contour(3, planets_coords, centers_array[i][2][0], 80);
    }

    //2 планеты
    if (centers_array[i][0].length === 2) {
      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center - centers_array[i][2][0] / 2]
            : [second_column_x, center_center - 20];

        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, center_center + centers_array[i][2][0] / 2 - 40]
            : [first_column_x, center_center - 20];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] / 2 - gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - centers_array[i][2][0]]
            : [second_column_x, upper_y_border - 40];
        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, upper_y_border - 40]
            : [first_column_x, upper_y_border - 40];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];
        planets_coords[1] =
          centers_array[i][2][1] === "vertical"
            ? [second_column_x, lower_y_border + centers_array[i][2][0] - 40]
            : [first_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      this.draw_many_planets(
        2,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_arrows(2, planets_coords);
      this.draw_contour(
        2,
        planets_coords,
        centers_array[i][2][0],
        centers_array[i][2][1] === "vertical" ? 20 : 80
      );
    }

    //1 планета
    if (centers_array[i][0].length === 1) {
      // проверяем если upper_y_border === lower_y_border то это первый центр
      // если неравны, то рисуем туда, где больше места, вверху или внизу
      if (upper_y_border === lower_y_border) {
        planets_coords[0] = [
          second_column_x,
          center_center - centers_array[i][2][0] / 2,
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] / 2 - gap_between_centers;
        lower_y_border =
          lower_y_border + centers_array[i][2][0] / 2 + gap_between_centers;

        //рисуем вверх
      } else if (
        Math.abs(upper_y_border - center_center) <=
        Math.abs(lower_y_border - center_center)
      ) {
        planets_coords[0] = [
          second_column_x,
          upper_y_border - centers_array[i][2][0],
        ];

        upper_y_border =
          upper_y_border - centers_array[i][2][0] - gap_between_centers;

        //рисуем вниз
      } else {
        planets_coords[0] = [second_column_x, lower_y_border];

        lower_y_border =
          lower_y_border + centers_array[i][2][0] + gap_between_centers;
      }

      // console.log(centers_array[i][0][0]);
      this.draw_many_planets(
        1,
        centers_array[i][0],
        planets_coords,
        formula_array
      );
      this.draw_contour(1, planets_coords, 30, 30);
    }
  }

  // console.log(this.planets_full_info);

  //при высоте в 480 у нас есть столбики, состоящие из 12 квадратов по вертикали каждый
  // 10 столбиков вправо и 1 столбик, дублирующий орбиту меркурия влево
  // если квадрат true, значит он уже занят планетой
  //от 1 до 10 орбиты
  //0-ой элемент - дублирующая орбита
  let occupied_arr = [];
  for (let i = 0; i < 11; i++) {
    occupied_arr[i] = [];

    for (let k = 0; k < 12; k++) {
      occupied_arr[i][k] = false;
    }
  }

  // console.log( occupied_arr);

  pers_x = second_column_x;
  const gap_between_orbits = 60;

  //console.log(centers_array.length);
  //console.log(`------`);

  //основной цикл для рисования планет на орбитах
  //рисуем орбиты, отталкиваясь от центров
  for (let i = 0; i < centers_array.length; i++) {
    for (let k = 0; k < centers_array[i][1]; k++) {
      while (this.find_next_planet(centers_array[i][0][k], formula_array)) {
        let next_planet = this.find_next_planet(
          centers_array[i][0][k],
          formula_array
        );
        let prev_planet = this.find_prev_planet(
          centers_array[i][0][k],
          formula_array
        );

        while (true) {
          //console.log(`next_planet = ${next_planet}`);
          //console.log(`prev_planet = ${prev_planet}`);

          if (next_planet) {
            prev_planet = next_planet;

            let y_square = NaN;
            let orbit = formula_array[next_planet].orbit;
            let points_to = formula_array[next_planet].point_to_planet;

            if (orbit === 1) {
              //возможность нарисовать планету слева
              let left_side = true;

              let center_number = formula_array[points_to].center_number;

              //проверяем для сдвоенного центра, если планета в центра стоит во втором ряду, то налево уже не нарисовать
              if (
                centers_array[center_number][1] === 2 &&
                centers_array[center_number][2][0] === 40 &&
                this.planets_full_info[points_to].x === second_column_x
              ) {
                left_side = false;
              }

              //проверяем для остальных центров, если планета в центра стоит во втором ряду, то налево уже не нарисовать
              if (
                centers_array[center_number][1] > 2 &&
                this.planets_full_info[points_to].x === second_column_x
              ) {
                left_side = false;
              }

              //проверяем, возможно на эту планету больше никакая другая не указывает, тогда ставим ее слева
              for (let key in formula_array) {
                if (next_planet === formula_array[key].point_to_planet) {
                  left_side = false;
                  break;
                }
              }

              if (left_side) {
                //определяем в каком квадрате рисовать
                y_square = Math.ceil(
                  (this.planets_full_info[points_to].y - start_center_y) /
                    (vertical_size / 12)
                );
                //console.log(y_square);
                //console.log(formula_array[key].point_to_planet);

                if (occupied_arr[0][y_square]) {
                  for (let inc = 1; inc < 3; inc++) {
                    if (
                      y_square + inc < 12 &&
                      !occupied_arr[0][y_square + inc]
                    ) {
                      y_square += inc;
                      break;
                    }
                    if (
                      y_square - inc > 0 &&
                      !occupied_arr[0][y_square - inc]
                    ) {
                      y_square -= inc;
                      break;
                    }
                  }
                }

                if (!occupied_arr[0][y_square]) {
                  occupied_arr[0][y_square] = true;

                  let planets_coords = [
                    [
                      pers_x - gap_between_orbits * 2,
                      (vertical_size / 12) * y_square + start_center_y,
                    ],
                    [
                      this.planets_full_info[points_to].x,
                      this.planets_full_info[points_to].y,
                    ],
                  ];

                  this.draw_many_planets(
                    1,
                    [next_planet],
                    planets_coords,
                    formula_array
                  );
                  this.draw_arrow(
                    planets_coords[0][0],
                    planets_coords[0][1],
                    planets_coords[1][0],
                    planets_coords[1][1]
                  );
                } else {
                  left_side = false;
                }
              }

              if (!left_side) {
                //определяем в каком квадрате рисовать
                y_square = Math.ceil(
                  (this.planets_full_info[points_to].y - start_center_y) /
                    (vertical_size / 12)
                );
                //console.log(y_square);
                //console.log(formula_array[key].point_to_planet);

                if (occupied_arr[orbit][y_square]) {
                  for (let inc = 1; inc < 12; inc++) {
                    if (
                      y_square + inc < 12 &&
                      !occupied_arr[orbit][y_square + inc]
                    ) {
                      y_square += inc;
                      break;
                    }
                    if (
                      y_square - inc > 0 &&
                      !occupied_arr[orbit][y_square - inc]
                    ) {
                      y_square -= inc;
                      break;
                    }
                  }
                }

                if (!occupied_arr[orbit][y_square]) {
                  occupied_arr[orbit][y_square] = true;

                  let planets_coords = [
                    [
                      pers_x + gap_between_orbits * orbit,
                      (vertical_size / 12) * y_square + start_center_y,
                    ],
                    [
                      this.planets_full_info[points_to].x,
                      this.planets_full_info[points_to].y,
                    ],
                  ];
                  //                            console.log(key);
                  //                            console.log(planets_coords);
                  //                            console.log(planets_coords[0][0]);
                  //                            console.log(planets_coords[0][1]);
                  this.draw_many_planets(
                    1,
                    [next_planet],
                    planets_coords,
                    formula_array
                  );
                  this.draw_arrow(
                    planets_coords[0][0],
                    planets_coords[0][1],
                    planets_coords[1][0],
                    planets_coords[1][1]
                  );
                } else {
                  throw "not enough space on the 1st orbit";
                }
              }

              // orbit !== 1
            } else {
              //определяем в каком квадрате рисовать
              y_square = Math.ceil(
                (this.planets_full_info[points_to].y - start_center_y) /
                  (vertical_size / 12)
              );
              //console.log(y_square);
              //console.log(formula_array[key].point_to_planet);

              if (occupied_arr[orbit][y_square]) {
                for (let inc = 1; inc < 12; inc++) {
                  if (
                    y_square + inc < 12 &&
                    !occupied_arr[orbit][y_square + inc]
                  ) {
                    y_square += inc;
                    break;
                  }
                  if (
                    y_square - inc > 0 &&
                    !occupied_arr[orbit][y_square - inc]
                  ) {
                    y_square -= inc;
                    break;
                  }
                }
              }

              if (!occupied_arr[orbit][y_square]) {
                occupied_arr[orbit][y_square] = true;

                let planets_coords = [
                  [
                    pers_x + gap_between_orbits * orbit,
                    (vertical_size / 12) * y_square + start_center_y,
                  ],
                  [
                    this.planets_full_info[points_to].x,
                    this.planets_full_info[points_to].y,
                  ],
                ];
                //                            console.log(key);
                //                            console.log(planets_coords);
                //                            console.log(planets_coords[0][0]);
                //                            console.log(planets_coords[0][1]);
                this.draw_many_planets(
                  1,
                  [next_planet],
                  planets_coords,
                  formula_array
                );
                this.draw_arrow(
                  planets_coords[0][0],
                  planets_coords[0][1],
                  planets_coords[1][0],
                  planets_coords[1][1]
                );
              } else {
                throw "not enough space on the orbit !!!!";
              }
            }

            next_planet = this.find_next_planet(next_planet, formula_array);
          } else {
            prev_planet = this.find_prev_planet(prev_planet, formula_array);

            if (prev_planet) {
              next_planet = this.find_next_planet(prev_planet, formula_array);
            } else {
              break;
            }
          }
        }
      }
    }
  }
};

DrawFormulaClass.prototype.draw_planet = function (planet, x, y, size, color) {
  switch (planet) {
    case "mercury":
      this.draw_mercury(x, y, size, color);
      break;
    case "venus":
      this.draw_venus(x, y, size, color);
      break;
    case "earth":
      this.draw_earth(x, y, size, color);
      break;
    case "mars":
      this.draw_mars(x, y, size, color);
      break;
    case "jupiter":
      this.draw_jupiter(x, y, size, color);
      break;
    case "saturn":
      this.draw_saturn(x, y, size, color);
      break;
    case "uranus":
      this.draw_uranus(x, y, size, color);
      break;
    case "neptune":
      this.draw_neptune(x, y, size, color);
      break;
    case "pluto":
      this.draw_pluto(x, y, size, color);
      break;
    case "sun":
      this.draw_sun(x, y, size, color);
      break;
    case "moon":
      this.draw_moon(x, y, size, color);
      break;
    case "north_node":
      this.draw_north_node(x, y, size, color);
      break;
    case "south_node":
      this.draw_south_node(x, y, size, color);
      break;

    default:
      break;
  }
};

//draw arrow from x,y to x1,y1 and orientation (vertical, horizontal, inclined)
DrawFormulaClass.prototype.draw_arrow = function (
  x,
  y,
  x1,
  y1,
  mutual_reception = false
) {
  let corr_x1,
    corr_x2,
    corr_y1,
    corr_y2 = NaN;

  //на каком конце рисовать стрелку
  // 0 - x,y
  // 1 - x1,y1
  // 2 - both ends
  let arrow_point = 1;

  let orientation = NaN;

  if (x === x1) {
    orientation = "vertical";
  } else if (y === y1) {
    orientation = "horizontal";
  } else {
    orientation = "inclined";
  }

  if (orientation === "vertical") {
    //всегда рисуем сверху вниз
    if (y > y1) {
      let temp = y;
      y = y1;
      y1 = temp;

      arrow_point = 0;
    }

    corr_x1 = 0;
    corr_x2 = 0;
    corr_y1 = 40;
    corr_y2 = 0;
  } else if (orientation === "horizontal") {
    //всегда рисуем справа налево
    if (x < x1) {
      let temp = x;
      x = x1;
      x1 = temp;

      arrow_point = 0;
    }

    corr_x1 = -17;
    corr_x2 = 20;
    corr_y1 = 20;
    corr_y2 = 20;
  } else {
    //всегда рисуем справа налево
    if (x < x1) {
      let temp = x;
      x = x1;
      x1 = temp;

      temp = y;
      y = y1;
      y1 = temp;

      arrow_point = 0;
    }

    if (y > y1) {
      corr_x1 = -10;
      corr_x2 = 20;
      corr_y1 = 15;
      corr_y2 = 30;
    } else {
      corr_x1 = -10;
      corr_x2 = 15;
      corr_y1 = 20;
      corr_y2 = 10;
    }
  }

  let points = [
    { x: x + corr_x1, y: y + corr_y1 },
    { x: x1 + corr_x2, y: y1 + corr_y2 },
  ];

  svg
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", "#1411ff")
    .attr("fill", "none");

  //стрелки

  if (mutual_reception) arrow_point = 2;

  if (arrow_point === 2 || arrow_point === 1) {
    points = [
      { x: x1 + corr_x2 - 3, y: y1 + corr_y2 - 3 },
      { x: x1 + corr_x2, y: y1 + corr_y2 },
      { x: x1 + corr_x2 + 3, y: y1 + corr_y2 - 3 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "#1411ff")
      .attr("fill", "none");
  }

  if (arrow_point === 2 || arrow_point === 0) {
    points = [
      { x: x + corr_x1 - 3, y: y + corr_y1 + 3 },
      { x: x + corr_x1, y: y + corr_y1 },
      { x: x + corr_x1 + 3, y: y + corr_y1 + 3 },
    ];

    svg
      .append("path")
      .attr("d", this.lineFunction(points))
      .attr("stroke", "#1411ff")
      .attr("fill", "none");
  }
};

//рисование Центра
DrawFormulaClass.prototype.draw_many_planets = function (
  number,
  planets,
  planets_coords,
  formula_array
) {
  for (let i = 0; i < number; i++) {
    this.draw_planet(
      planets[i],
      planets_coords[i][0],
      planets_coords[i][1],
      this.size_of_the_planet_to_draw,
      "black"
    );

    this.planets_full_info[planets[i]].x = planets_coords[i][0];
    this.planets_full_info[planets[i]].y = planets_coords[i][1];
    this.planets_full_info[planets[i]].drawn = true;

    //рисуем силу и ретроградность
    this.draw_power_and_retro(
      planets[i],
      planets_coords[i],
      "black",
      formula_array
    );
  }
};

//рисуем силу и ретроградность
DrawFormulaClass.prototype.draw_power_and_retro = function (
  planet,
  planets_coords,
  color,
  formula_array
) {
  //рисуем силу и ретроградность
  this.appendText(
    planets_coords[0] + 7,
    planets_coords[1] + 17,
    `${formula_array[planet].direction}`,
    color,
    "start",
    10
  );
  this.appendText(
    planets_coords[0] + 7,
    planets_coords[1] + 29,
    `${formula_array[planet].power}`,
    color,
    "start",
    10
  );
};

DrawFormulaClass.prototype.draw_mercury = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 15;

  let points = [];

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y - radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius / 1.5)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_venus = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 15;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_earth = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;
  radius -= 3;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x - radius, y: y },
    { x: x + radius, y: y },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y - radius },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_mars = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x + radius - 5, y: y - radius / 2 },
    { x: x + radius * 3, y: y - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius * 3, y: y - radius * 1.5 },
    { x: x + radius * 2, y: y - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius * 3, y: y - radius * 1.5 },
    { x: x + radius * 3, y: y - radius / 2 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_jupiter = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" +
        [points[0].x - radius, points[0].y + Math.trunc(radius)] +
        ")"
    )
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius / 1.5 - 1,
        outerRadius: radius / 1.5,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_saturn = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y -= 15;

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 2, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x + radius, y: y + radius + Math.trunc((radius * 1.5) / 2) }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" +
        [points[0].x - radius, points[0].y + Math.trunc(radius)] +
        ")"
    )
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius / 1.5 - 1,
        outerRadius: radius / 1.5,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_neptune = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 23;

  let points = [];

  points = [
    { x: x, y: y - radius },
    { x: x, y: y - radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y - radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr("transform", "translate(" + [points[0].x, points[0].y] + ")")
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_uranus = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 23;

  radius /= 2;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y - radius },
    { x: x, y: y - radius - radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y - radius - Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y - radius - Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y - radius },
    { x: x - radius / 1.5, y: y - radius - 2 * Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x + radius / 1.5, y: y - radius },
    { x: x + radius / 1.5, y: y - radius - 2 * Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");
};
DrawFormulaClass.prototype.draw_pluto = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y + radius - radius / 3 - 3)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [
    { x: x, y: y + radius },
    { x: x, y: y + radius + radius * 1.5 },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [
    { x: x - radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
    { x: x + radius / 1.5, y: y + radius + Math.trunc((radius * 1.5) / 2) },
  ];

  svg_planet
    .append("path")
    .attr("d", this.lineFunction(points))
    .attr("stroke", color)
    .attr("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius / 1.5)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
DrawFormulaClass.prototype.draw_sun = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  //   let points = [];

  y += 20;
  radius -= 3;

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 1)
    .attr("stroke", color)
    .style("fill", color);
};
DrawFormulaClass.prototype.draw_moon = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;
  radius -= 3;

  points = [{ x: x, y: y }];

  let arc = d3.arc();

  //полукруг
  svg_planet
    .append("path")
    .attr("transform", "translate(" + [points[0].x, points[0].y] + ")")
    .attr("stroke", color)
    .attr("fill", "none")
    .attr(
      "d",
      arc({
        innerRadius: radius - 5,
        outerRadius: radius,
        startAngle: -Math.PI,
        endAngle: -Math.PI * 2,
      })
    );
};
DrawFormulaClass.prototype.draw_north_node = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  y += 15;

  let points = [];

  svg_planet
    .append("circle")
    .attr("cx", x - radius / 1.5)
    .attr("cy", y + radius - radius / 2)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x + radius / 1.5)
    .attr("cy", y + radius - radius / 2)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
      })
    );
};
DrawFormulaClass.prototype.draw_south_node = function (x, y, radius, color) {
  let svg_planet = svg.append("g");

  let points = [];

  y += 20;

  svg_planet
    .append("circle")
    .attr("cx", x - radius / 1.5)
    .attr("cy", y + radius - radius * 1.5)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  svg_planet
    .append("circle")
    .attr("cx", x + radius / 1.5)
    .attr("cy", y + radius - radius * 1.5)
    .attr("r", radius / 3)
    .attr("stroke", color)
    .style("fill", "none");

  points = [{ x: x, y: y + radius }];

  let arc = d3.arc();
  //полукруг
  svg_planet
    .append("path")
    .attr(
      "transform",
      "translate(" + [points[0].x, points[0].y - Math.trunc(radius)] + ")"
    )
    .attr("stroke", color)
    .attr(
      "d",
      arc({
        innerRadius: Math.trunc(radius / 1.5) - 1,
        outerRadius: Math.trunc(radius / 1.5),
        startAngle: -Math.PI / 2,
        endAngle: -(Math.PI + Math.PI / 2),
      })
    );
};
