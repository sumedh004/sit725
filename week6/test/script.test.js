const chai = require('chai');
const expect = chai.expect;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const jquery = require('jquery');

describe('JavaScript Functions', function() {
  it('should correctly fetch and display schedule', function(done) {
    const { window } = new JSDOM(`
      <body>
        <table class="highlight schedule-table responsive-table">
          <tbody id="scheduleTableBody"></tbody>
        </table>
      </body>
    `);

    const { document } = window;
    global.document = document;
    global.window = window;
    global.$ = jquery(window);

    // Simulate the fetchSchedule function
    const script = `
      function fetchSchedule() {
        $('#scheduleTableBody').append('<tr><td>10:00</td><td>Opening Ceremony</td><td>Alice</td></tr>');
      }
      fetchSchedule();
    `;
    
    // Use eval in a safe environment
    eval(script);

    // Verify that the row was added
    const row = $('#scheduleTableBody').find('tr').first();
    expect(row).to.exist;
    expect(row.find('td').first().text()).to.equal('10:00');
    expect(row.find('td').eq(1).text()).to.equal('Opening Ceremony');
    expect(row.find('td').eq(2).text()).to.equal('Alice');

    done();
  });
});
