DrawFormulaClass.prototype.draw_transitInfText = function () {
  let pers_x = 10;
  let pers_y = 20;

  //Name
  let name = "Transit calculation.";
  this.appendText(10, 20, `${name}`);
  pers_y += 20;

  //date and time
  let [d_year, d_month, d_day, d_hour, d_minute, d_second] = transits.time_UTC;
  let date_text = `${d_hour}:${d_minute}:${d_second} ${d_day}.${d_month}.${d_year}`;
  this.appendText(pers_x, pers_y, `UTC: ${date_text}`);

  //Planets
  let planet_text = ``;

  //PERSONALITY
  pers_x = svg.attr("width") - 10;
  pers_y = 100;

  this.appendText(pers_x, pers_y, `Personality:`, "black", "end");
  pers_y += 30;

  planet_text = `Sun: ${transits.sun.hex}.${Math.ceil(transits.sun.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Earth: ${transits.earth.hex}.${Math.ceil(
    transits.earth.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Moon: ${transits.moon.hex}.${Math.ceil(transits.moon.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `N.Node ${transits.north_node.hex}.${Math.ceil(
    transits.north_node.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `S.Node: ${transits.south_node.hex}.${Math.ceil(
    transits.south_node.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mercury: ${transits.mercury.hex}.${Math.ceil(
    transits.mercury.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Venus: ${transits.venus.hex}.${Math.ceil(
    transits.venus.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Mars: ${transits.mars.hex}.${Math.ceil(transits.mars.line)}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Jupiter: ${transits.jupiter.hex}.${Math.ceil(
    transits.jupiter.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Saturn: ${transits.saturn.hex}.${Math.ceil(
    transits.saturn.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Uranus: ${transits.uranus.hex}.${Math.ceil(
    transits.uranus.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Neptune: ${transits.neptune.hex}.${Math.ceil(
    transits.neptune.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
  pers_y += 20;

  planet_text = `Pluto: ${transits.pluto.hex}.${Math.ceil(
    transits.pluto.line
  )}`;
  this.appendText(pers_x, pers_y, planet_text, "black", "end");
};
//функция висит на кнопке Calc.Transit
DrawFormulaClass.prototype.draw_Transit = function () {
  this.draw_transitInfText();

  let gates = [];

  //инициализируем центры
  let centres = {
    head: false,
    ajna: false,
    throat: false,
    g: false,
    sacral: false,
    root: false,
    ego: false,
    spleen: false,
    emo: false,
  };

  //инициализируем ворота, отсчет от 1
  for (let i = 1; i <= 64; i++) {
    gates[i] = NaN;
  }

  delete transits.north_node_swe;
  delete transits.south_node_swe;
  delete transits.time_UTC;

  for (let key in transits) {
    gates[transits[key].hex] = "black";
  }

  //console.log(gates);

  //пока рисуем воротами, каналами пока не рисуем

  //HEAD && AJNA
  if (gates[64] || gates[47]) {
    if (gates[64] && gates[47]) {
      centres.head = true;
      centres.ajna = true;
    }
    if (gates[64]) this.draw_64_47(64, gates[64]);
    if (gates[47]) this.draw_64_47(47, gates[47]);
  }

  if (gates[61] || gates[24]) {
    if (gates[61] && gates[24]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[61]) this.draw_61_24(61, gates[61]);
    if (gates[24]) this.draw_61_24(24, gates[24]);
  }

  if (gates[63] || gates[4]) {
    if (gates[63] && gates[4]) {
      centres.head = true;
      centres.ajna = true;
    }

    if (gates[63]) this.draw_63_4(63, gates[63]);
    if (gates[4]) this.draw_63_4(4, gates[4]);
  }

  //AJNA && THROAT

  if (gates[17] || gates[62]) {
    if (gates[17] && gates[62]) {
      centres.throat = true;
      centres.ajna = true;
    }
    if (gates[17]) this.draw_17_62(17, gates[17]);
    if (gates[62]) this.draw_17_62(62, gates[62]);
  }

  if (gates[43] || gates[23]) {
    if (gates[43] && gates[23]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[43]) this.draw_43_23(43, gates[43]);
    if (gates[23]) this.draw_43_23(23, gates[23]);
  }

  if (gates[11] || gates[56]) {
    if (gates[11] && gates[56]) {
      centres.throat = true;
      centres.ajna = true;
    }

    if (gates[11]) this.draw_11_56(11, gates[11]);
    if (gates[56]) this.draw_11_56(56, gates[56]);
  }

  //THROAT && G

  if (gates[31] || gates[7]) {
    if (gates[31] && gates[7]) {
      centres.throat = true;
      centres.g = true;
    }
    if (gates[31]) this.draw_31_7(31, gates[31]);
    if (gates[7]) this.draw_31_7(7, gates[7]);
  }

  if (gates[8] || gates[1]) {
    if (gates[8] && gates[1]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[8]) this.draw_8_1(8, gates[8]);
    if (gates[1]) this.draw_8_1(1, gates[1]);
  }

  if (gates[33] || gates[13]) {
    if (gates[33] && gates[13]) {
      centres.throat = true;
      centres.g = true;
    }

    if (gates[33]) this.draw_33_13(33, gates[33]);
    if (gates[13]) this.draw_33_13(13, gates[13]);
  }

  //G && SACRAL

  if (gates[15] || gates[5]) {
    if (gates[15] && gates[5]) {
      centres.g = true;
      centres.sacral = true;
    }
    if (gates[15]) this.draw_15_5(15, gates[15]);
    if (gates[5]) this.draw_15_5(5, gates[5]);
  }

  if (gates[2] || gates[14]) {
    if (gates[2] && gates[14]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[2]) this.draw_2_14(2, gates[2]);
    if (gates[14]) this.draw_2_14(14, gates[14]);
  }

  if (gates[46] || gates[29]) {
    if (gates[46] && gates[29]) {
      centres.g = true;
      centres.sacral = true;
    }

    if (gates[46]) this.draw_46_29(46, gates[46]);
    if (gates[29]) this.draw_46_29(29, gates[29]);
  }

  //SACRAL && ROOT
  if (gates[42] || gates[53]) {
    if (gates[42] && gates[53]) {
      centres.sacral = true;
      centres.root = true;
    }
    if (gates[42]) this.draw_42_53(42, gates[42]);
    if (gates[53]) this.draw_42_53(53, gates[53]);
  }

  if (gates[3] || gates[60]) {
    if (gates[3] && gates[60]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[3]) this.draw_3_60(3, gates[3]);
    if (gates[60]) this.draw_3_60(60, gates[60]);
  }

  if (gates[9] || gates[52]) {
    if (gates[9] && gates[52]) {
      centres.sacral = true;
      centres.root = true;
    }

    if (gates[9]) this.draw_9_52(9, gates[9]);
    if (gates[52]) this.draw_9_52(52, gates[52]);
  }

  //ROOT && EMO
  if (gates[19] || gates[49]) {
    if (gates[19] && gates[49]) {
      centres.root = true;
      centres.emo = true;
    }
    if (gates[19]) this.draw_49_19(19, gates[19]);
    if (gates[49]) this.draw_49_19(49, gates[49]);
  }

  if (gates[39] || gates[55]) {
    if (gates[39] && gates[55]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[39]) this.draw_55_39(39, gates[39]);
    if (gates[55]) this.draw_55_39(55, gates[55]);
  }

  if (gates[41] || gates[30]) {
    if (gates[41] && gates[30]) {
      centres.root = true;
      centres.emo = true;
    }

    if (gates[41]) this.draw_30_41(41, gates[41]);
    if (gates[30]) this.draw_30_41(30, gates[30]);
  }

  //ROOT && SPLEEN
  if (gates[18] || gates[58]) {
    if (gates[18] && gates[58]) {
      centres.root = true;
      centres.spleen = true;
    }
    if (gates[18]) this.draw_18_58(18, gates[18]);
    if (gates[58]) this.draw_18_58(58, gates[58]);
  }

  if (gates[28] || gates[38]) {
    if (gates[28] && gates[38]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[28]) this.draw_28_38(28, gates[28]);
    if (gates[38]) this.draw_28_38(38, gates[38]);
  }

  if (gates[32] || gates[54]) {
    if (gates[32] && gates[54]) {
      centres.root = true;
      centres.spleen = true;
    }

    if (gates[32]) this.draw_32_54(32, gates[32]);
    if (gates[54]) this.draw_32_54(54, gates[54]);
  }

  //EMO && SACRAL, EGO, THROAT
  if (gates[59] || gates[6]) {
    if (gates[59] && gates[6]) {
      centres.emo = true;
      centres.sacral = true;
    }
    if (gates[59]) this.draw_6_59(59, gates[59]);
    if (gates[6]) this.draw_6_59(6, gates[6]);
  }

  if (gates[37] || gates[40]) {
    if (gates[37] && gates[40]) {
      centres.emo = true;
      centres.ego = true;
    }

    if (gates[37]) this.draw_40_37(37, gates[37]);
    if (gates[40]) this.draw_40_37(40, gates[40]);
  }

  if (gates[22] || gates[12]) {
    if (gates[22] && gates[12]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[22]) this.draw_12_22(22, gates[22]);
    if (gates[12]) this.draw_12_22(12, gates[12]);
  }

  if (gates[35] || gates[36]) {
    if (gates[35] && gates[36]) {
      centres.emo = true;
      centres.throat = true;
    }

    if (gates[35]) this.draw_35_36(35, gates[35]);
    if (gates[36]) this.draw_35_36(36, gates[36]);
  }

  //EGO && SPLEEN, G, THROAT
  if (gates[44] || gates[26]) {
    if (gates[44] && gates[26]) {
      centres.ego = true;
      centres.spleen = true;
    }
    if (gates[44]) this.draw_26_44(44, gates[44]);
    if (gates[26]) this.draw_26_44(26, gates[26]);
  }

  if (gates[51] || gates[25]) {
    if (gates[51] && gates[25]) {
      centres.ego = true;
      centres.g = true;
    }

    if (gates[51]) this.draw_25_51(51, gates[51]);
    if (gates[25]) this.draw_25_51(25, gates[25]);
  }

  if (gates[21] || gates[45]) {
    if (gates[21] && gates[45]) {
      centres.ego = true;
      centres.throat = true;
    }

    if (gates[21]) this.draw_45_21(21, gates[21]);
    if (gates[45]) this.draw_45_21(45, gates[45]);
  }

  //SACRAL && SPLEEN
  if (gates[27] || gates[50]) {
    if (gates[27] && gates[50]) {
      centres.spleen = true;
      centres.sacral = true;
    }
    if (gates[27]) this.draw_50_27(27, gates[27]);
    if (gates[50]) this.draw_50_27(6, gates[50]);
  }

  //THROAT && SPLEEN
  if (gates[48] || gates[16]) {
    if (gates[48] && gates[16]) {
      centres.spleen = true;
      centres.throat = true;
    }
    if (gates[48]) this.draw_16_48(48, gates[48]);
    if (gates[16]) this.draw_16_48(16, gates[16]);
  }

  //INTEGRATION
  if (gates[20] || gates[57] || gates[10] || gates[34]) {
    if (gates[20] && gates[57]) {
      centres.spleen = true;
      centres.throat = true;
    }

    if (gates[20] && gates[10]) {
      centres.g = true;
      centres.throat = true;
    }

    if (gates[20] && gates[34]) {
      centres.sacral = true;
      centres.throat = true;
    }

    if (gates[10] && gates[57]) {
      centres.spleen = true;
      centres.g = true;
    }

    if (gates[34] && gates[57]) {
      centres.spleen = true;
      centres.sacral = true;
    }

    if (gates[34] && gates[10]) {
      centres.g = true;
      centres.sacral = true;
    }

    let int_gates = {};
    gates[20] ? (int_gates["20"] = gates[20]) : (int_gates["20"] = NaN);
    gates[57] ? (int_gates["57"] = gates[57]) : (int_gates["57"] = NaN);
    gates[10] ? (int_gates["10"] = gates[10]) : (int_gates["10"] = NaN);
    gates[34] ? (int_gates["34"] = gates[34]) : (int_gates["34"] = NaN);

    this.drawIntegration(int_gates);
  }

  centres.head ? this.drawHeadCentre() : this.drawHeadCentre("white");
  centres.ajna ? this.drawAjnaCentre() : this.drawAjnaCentre("white");
  centres.throat ? this.drawThroatCentre() : this.drawThroatCentre("white");
  centres.g ? this.drawGCentre() : this.drawGCentre("white");
  centres.sacral ? this.drawSacralCentre() : this.drawSacralCentre("white");
  centres.root ? this.drawRootCentre() : this.drawRootCentre("white");
  centres.spleen ? this.drawSpleenCentre() : this.drawSpleenCentre("white");
  centres.ego ? this.drawEgoCentre() : this.drawEgoCentre("white");
  centres.emo ? this.drawEmoCentre() : this.drawEmoCentre("white");
};
