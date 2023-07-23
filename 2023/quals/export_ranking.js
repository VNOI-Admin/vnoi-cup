function download_table_as_csv() {
  function clean_text(text) {
    // Remove new line and leading/trailing spaces
    text = text.replace(/(\r\n|\n|\r)/gm, '').trim();
    // Escape double-quote with double-double-quote
    text = text.replace(/"/g, '""');

    return '"' + text + '"';
  }

  var csv = [];

  $('#ranking-table thead tr').each(function () {
    var header = [];
    $(this)
      .find('th')
      .each(function () {
        var $col = $(this);

        if ($col.hasClass('rating-column')) {
          // Skip rating
          return;
        } else if ($col.hasClass('rank')) {
          // Rank
          header.push(clean_text($col.text()));
        } else if ($col.hasClass('username')) {
          // Username and Full name
          header.push(clean_text('Username'));
          header.push(clean_text('Full Name'));
        } else {
          // Point
          var name = $col.find('.problem-code').text();
          if (name != '') {
            header.push(clean_text(name));
          }
        }
      });
    header.push('"Points"');
    header.push('"Penalty"');
    csv.push(header.join(','));
  });

  $('#ranking-table tbody tr').each(function () {
    if ($(this).find('td').first().text() === 'Total AC') {
      return;
    }

    var row_data = [];
    $(this)
      .find('td')
      .each(function () {
        var $col = $(this);

        if ($col.hasClass('rating-column') || $col.hasClass('user-points')) {
          // Skip rating and points
          return;
        } else if ($col.hasClass('user-name')) {
          // Username and Full name
          row_data.push(clean_text($col.find('.rating').first().text()));
          row_data.push(clean_text($col.find('.personal-info').first().text()));
        } else {
          // Point or rank
          row_data.push(
            clean_text($col.ignore('.solving-time').ignore('small').text())
          );
        }
      });
    row_data.push(
      clean_text($(this).find('.user-points').ignore('.solving-time').text())
    );
    row_data.push(
      clean_text($(this).find('.user-points .solving-time').text())
    );
    csv.push(row_data.join(','));
  });

  var csv_string = csv.join('\n');
  var filename = 'ranking.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute(
    'href',
    'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv_string)
  );
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

download_table_as_csv();
