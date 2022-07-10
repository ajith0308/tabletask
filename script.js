var url = "https://www.balldontlie.io/api/v1/players";
var request = { method: "GET" };
var globleresult;
$(window).on("load", function () {
  var team = [];
  fetch(url, request)
    .then((response) => response.json())
    .then((result) => {
      globleresult = result.data;
      for (let key in result.data) {
        let obj = result.data[key];
        $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
        if (team.indexOf(obj.team.name) === -1) {
          $(".dropclass").append(`
          <option value="${obj.team.name}">${obj.team.name}</option>
          `);
          team.push(obj.team.name);
        }
      }
    });
});

$(".dropclass").on("change", function () {
  let team = $("option:selected").text();
  if (team != "All") {
    $("tbody tr").remove();
    addselectedteam(team);
  }
});

function addselectedteam(team) {
  let game = globleresult.filter((a) => {
    if (a.team.name === team) {
      $("tbody").append(`<tr>
          <td>${a.id}</td>
          <td>${a.first_name}</td>
          <td>${a.team.division}</td>
          <td>${a.team.name}</td>
        </tr>`);
    }
  });
  if (team === "ALL") {
    for (let key in globleresult) {
      let obj = globleresult[key];
      $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
    }
  }
}

$("#sortbyname").on("click", function () {
  let namesort = globleresult.filter((a) => {
    return a;
  });
  let sortedArray = namesort.sort(function (a, b) {
    return a.first_name.localeCompare(b.first_name);
  });
  $("tbody tr").remove();
  for (let key in sortedArray) {
    let obj = sortedArray[key];
    $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
  }
});
$("#sortbyteam").on("click", function () {
  let namesort = globleresult.filter((a) => {
    return a;
  });
  let sortedArray = namesort.sort(function (a, b) {
    return a.team.name.localeCompare(b.team.name);
  });
  $("tbody tr").remove();
  for (let key in sortedArray) {
    let obj = sortedArray[key];
    $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
  }
});

$("#sortbydivision").on("click", function () {
  let namesort = globleresult.filter((a) => {
    return a;
  });
  let sortedArray = namesort.sort(function (a, b) {
    return a.team.division.localeCompare(b.team.division);
  });
  $("tbody tr").remove();
  for (let key in sortedArray) {
    let obj = sortedArray[key];
    $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
  }
});
$("#sortid").on("click", function () {
  let namesort = globleresult.filter((a) => {
    return a;
  });
  let sortedArray = namesort.sort(function (a, b) {
    return a.id > b.id ? 1 : -1;
  });
  $("tbody tr").remove();
  for (let key in sortedArray) {
    let obj = sortedArray[key];
    $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
  }
});

$("#search").on("blur", function () {
  let searchtext = $("#search").val();
  let searchfilter = globleresult.filter((a) => {
    let search = searchtext.toLowerCase();
    let name = a.first_name;
    let sname = name.toLowerCase();
    let team = a.team.division;
    let teams = team.toLowerCase();
    let td = a.team.name;
    let tds = td.toLowerCase();

    if (search == a.id) {
      return a.id;
    }
    if (sname == search) {
      return a.first_name;
    }
    if (teams == search) {
      return a.team.division;
    }
    if (tds == search) {
      return a.team.name;
    }
  });

  if (searchfilter != "") {
    $("tbody tr").remove();
    for (let key in searchfilter) {
      let obj = searchfilter[key];
      $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
    }
  } else {
    $("tbody tr").remove();

    for (let key in globleresult) {
      let obj = globleresult[key];
      $("tbody").append(`<tr>
          <td>${obj.id}</td>
          <td>${obj.first_name}</td>
          <td>${obj.team.division}</td>
          <td>${obj.team.name}</td>
        </tr>`);
    }
  }
});
