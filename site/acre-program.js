/* Acre Mortgage loan-program pages: shared script.
   Lives at github.com/albanhox/acre-site-assets -> site/acre-program.js, served by jsDelivr.
   Every program page in Cerberus holds only that program's content (hero, body, survey card) inside
   <div id="acre-program" data-program="slug">. This script draws everything shared: nav, payment estimate,
   related programs, loan-officer band, footer. Change it, push, purge jsDelivr, and all 29 pages change. */
(function () {
  'use strict';
  var CFG = {
    RATES_URL: 'https://raw.githubusercontent.com/albanhox/acre-rates/main/rates.json',
    HQ_PHONE: '(856) 606-1070', HQ_TEL: '+18566061070',
    PAY_URL: 'https://swp.paymentsgateway.net/co/default.aspx?pg_api_login_id=73CD60681B',
    LOGO: 'https://assets.cdn.filesafe.space/WRSWZkMuFbVf1m9jbNIE/media/677da085aa77f6a0c839fe7e.png',
    SITE: 'https://acremortgage.com'
  };
  var PROGRAMS = [{"slug":"purchase","name":"Buying a home","short":"Every purchase program in one place, from 0% down.","group":"Buy"},{"slug":"refinance","name":"Refinancing","short":"Lower the rate, change the term, or take cash out.","group":"Refinance"},{"slug":"conventional-purchase","name":"Conventional purchase loan","short":"Minimum down: 3% first-time, 5% others. Minimum credit: 620.","group":"Buy"},{"slug":"conventional-refinance","name":"Conventional refinance","short":"Rate-and-term or cash-out. Cash-out up to 80% of value.","group":"Refinance"},{"slug":"fha-purchase","name":"FHA purchase loan","short":"Minimum down: 3.5% with a 580+ score. Minimum credit: 580 (500 with 10% down).","group":"Buy"},{"slug":"fha-refinance","name":"FHA refinance","short":"Streamline with no appraisal, or cash-out up to 80% of value.","group":"Refinance"},{"slug":"va-purchase","name":"VA purchase loan","short":"Minimum down: 0%. No monthly mortgage insurance.","group":"Buy"},{"slug":"va-refinance","name":"VA refinance (IRRRL and cash-out)","short":"IRRRL streamline with no appraisal, or cash-out up to 90% of value.","group":"Refinance"},{"slug":"usda-purchase","name":"USDA purchase loan","short":"Minimum down: 0%. Income limit: 115% of area median.","group":"Buy"},{"slug":"usda-refinance","name":"USDA refinance","short":"Streamlined-assist with no appraisal or credit review.","group":"Refinance"},{"slug":"jumbo-purchase","name":"Jumbo purchase loan","short":"Above the conforming limit. Minimum down: 10% to 20%.","group":"Buy"},{"slug":"jumbo-refinance","name":"Jumbo refinance","short":"Rate-and-term or cash-out on loans above the conforming limit.","group":"Refinance"},{"slug":"dpa","name":"Down payment assistance","short":"Grants and second liens layered on FHA or conventional loans.","group":"Buy"},{"slug":"bank-statement-purchase","name":"Bank statement purchase loan","short":"Qualify on 12 or 24 months of deposits, no tax returns.","group":"Investor & self-employed"},{"slug":"bank-statement-refinance","name":"Bank statement refinance","short":"Refinance or cash out on deposits, not tax returns.","group":"Investor & self-employed"},{"slug":"no-income-purchase","name":"No-income verification purchase loan","short":"Qualify on assets or the property, not a paycheck.","group":"Investor & self-employed"},{"slug":"no-income-refinance","name":"No-income verification refinance","short":"Refinance or cash out on assets or rent, no income docs.","group":"Investor & self-employed"},{"slug":"dscr-purchase","name":"DSCR investor purchase loan","short":"Qualify on the rent. No personal income, LLC vesting allowed.","group":"Investor & self-employed"},{"slug":"dscr-refinance","name":"DSCR investor refinance","short":"Cash out of a rental on the rent alone, up to 75% of value.","group":"Investor & self-employed"},{"slug":"itin-purchase","name":"ITIN purchase loan","short":"Buy a home with an ITIN instead of a Social Security number.","group":"Investor & self-employed"},{"slug":"itin-refinance","name":"ITIN refinance","short":"Refinance or take cash out of a home financed with an ITIN.","group":"Investor & self-employed"},{"slug":"203k-purchase","name":"FHA 203k purchase loan","short":"Minimum down: 3.5% of price plus repairs. Limited 203k up to $75,000.","group":"Renovate"},{"slug":"203k-refinance","name":"FHA 203k refinance","short":"Loan amount: current balance plus repairs, based on after-repair value.","group":"Renovate"},{"slug":"homestyle-purchase","name":"HomeStyle renovation purchase","short":"Minimum down: 3% first-time, 5% others. Renovation budget: up to 75% of after-repair value.","group":"Renovate"},{"slug":"homestyle-refinance","name":"HomeStyle renovation refinance","short":"Refinance and renovate on the after-repair value, conventional terms.","group":"Renovate"},{"slug":"construction","name":"Construction loan","short":"One-time close: land, build and permanent loan in a single closing.","group":"Renovate"},{"slug":"home-equity","name":"Home equity","short":"Cash-out refinance, HELOC or fixed home equity loan, up to 80% to 85% of value.","group":"Refinance"},{"slug":"reverse-purchase","name":"Reverse mortgage for purchase","short":"Age 62+. Buy with roughly half down and no monthly mortgage payment.","group":"Reverse"},{"slug":"reverse-refinance","name":"Reverse mortgage","short":"Age 62+. Turn equity into income or a line of credit with no monthly payment.","group":"Reverse"}];
  var YEAR = new Date().getFullYear();
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    ehl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M8 20v-6h8v6"/><path d="M8 16h8"/></svg>'
  };
  var SOCIAL = [
    ['https://www.facebook.com/acremortgage', 'Facebook', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>'],
    ['https://www.instagram.com/acremortgage', 'Instagram', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'],
    ['https://www.youtube.com/@acremortgage', 'YouTube', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.4-.9-2.3-2.3-2.5C17.6 5.5 12 5.5 12 5.5s-5.6 0-7.7.2C2.9 5.9 2.2 6.8 2 8.2 1.8 10 1.8 12 1.8 12s0 2 .2 3.8c.2 1.4.9 2.3 2.3 2.5 2.1.2 7.7.2 7.7.2s5.6 0 7.7-.2c1.4-.2 2.1-1.1 2.3-2.5.2-1.8.2-3.8.2-3.8s0-2-.2-3.8zM10 15V9l5.2 3z"/></svg>'],
    ['https://www.tiktok.com/@acremortgage', 'TikTok', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.6 3.7 3.8v3.3c-1.4 0-2.6-.4-3.7-1.1v6.2A5.4 5.4 0 1 1 11.1 10v3.4a2 2 0 1 0 2 2V3z"/></svg>']
  ];

  function navHTML() {
    var S = CFG.SITE;
    return '<header class="nav" id="nav"><div class="wrap nav-inner">' +
      '<a class="logo" href="' + S + '" aria-label="Acre Mortgage home"><img src="' + CFG.LOGO + '" alt="Acre Mortgage"></a>' +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false" id="nav-toggle">' + I.menu + '</button>' +
      '<nav class="nav-links" aria-label="Main"><a href="' + S + '/purchase">Buy</a><a href="' + S + '/refinance">Refinance</a><a href="' + S + '/home-equity">Home equity</a><a href="' + S + '/construction">Renovate</a><a href="' + S + '/reverse-refinance">Reverse</a><a href="' + S + '/#rates">Rates</a><a href="' + S + '/#experts">Loan officers</a><a href="' + S + '/#learn">Resources</a></nav>' +
      '<div class="nav-right"><a class="quiet" href="' + CFG.PAY_URL + '" target="_blank" rel="noopener">Make a payment</a><a class="nav-phone" href="tel:' + CFG.HQ_TEL + '">' + I.phone + CFG.HQ_PHONE + '</a><a class="btn btn-black btn-sm" href="#apply">Get pre-approved</a></div>' +
      '</div></header>';
  }
  function footerHTML() {
    var S = CFG.SITE;
    var col = function (h, items) { return '<div><h4>' + h + '</h4><ul>' + items.map(function (x) { return '<li><a href="' + x[1] + '"' + (x[2] ? ' target="_blank" rel="noopener"' : '') + '>' + x[0] + '</a></li>'; }).join('') + '</ul></div>'; };
    return '<footer><div class="wrap"><div class="foot"><div>' +
      '<a class="logo" href="' + S + '"><img src="' + CFG.LOGO + '" alt="Acre Mortgage"></a>' +
      '<p style="margin-top:14px">Acre Mortgage · NMLS 13988<br>70 East Main St., Marlton, NJ 08053<br><a href="tel:' + CFG.HQ_TEL + '">' + CFG.HQ_PHONE + '</a> · <a href="mailto:info@acremortgage.com">info@acremortgage.com</a></p>' +
      '<div class="social">' + SOCIAL.map(function (s) { return '<a href="' + s[0] + '" aria-label="' + s[1] + '" target="_blank" rel="noopener">' + s[2] + '</a>'; }).join('') + '</div></div>' +
      col('Buy', [['Conventional', S + '/conventional-purchase'], ['FHA', S + '/fha-purchase'], ['VA', S + '/va-purchase'], ['USDA', S + '/usda-purchase'], ['Jumbo', S + '/jumbo-purchase'], ['Down payment assistance', S + '/dpa']]) +
      col('Refinance', [['Rate and term', S + '/conventional-refinance'], ['Home equity', S + '/home-equity'], ['FHA streamline', S + '/fha-refinance'], ['VA IRRRL', S + '/va-refinance'], ['DSCR investor', S + '/dscr-refinance']]) +
      col('Renovate &amp; reverse', [['Construction', S + '/construction'], ['FHA 203k', S + '/203k-purchase'], ['HomeStyle', S + '/homestyle-purchase'], ['Reverse mortgage', S + '/reverse-refinance'], ['Reverse purchase', S + '/reverse-purchase']]) +
      col('Company', [['About Acre', S + '/about-us'], ['Loan officers', S + '/#experts'], ['Branch map', S + '/#branches'], ['Book an appointment', S + '/calendar'], ['Make a payment', CFG.PAY_URL, 1], ['Calculators', S + '/mortgagecalc'], ['NMLS Consumer Access', 'https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/13988', 1]]) +
      '</div><div class="legal"><div class="ehl">' + I.ehl + '<span>Acre Mortgage is an Equal Housing Lender. We fully comply with the Equal Credit Opportunity Act (ECOA) and all other Federal regulations. All applicants applying for credit from Acre Mortgage will never be discouraged on the basis of race, color, religion, national origin, sex, military status, marital status, age, or because you get public assistance. All information we request is voluntary and will be kept confidential.</span></div>' +
      '<p>Acre Mortgage, NMLS 13988, is licensed to lend in Alabama, Colorado, Connecticut, Delaware, the District of Columbia, Florida, Georgia, Indiana, Maryland, New Jersey, North Carolina, Pennsylvania, South Carolina, Tennessee, Texas and Virginia. Verify our licenses at <a href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/13988" target="_blank" rel="noopener">NMLS Consumer Access</a>. Rates shown are national averages for information only and are not an offer to lend. This is not a commitment to lend. All loans subject to credit approval and program guidelines. Rates, terms and programs subject to change without notice. <a href="' + S + '/licensing">Licensing</a> · <a href="' + S + '/terms-and-conditions">Terms &amp; conditions</a> · <a href="' + S + '/privacy-policy">Privacy policy</a> · © ' + YEAR + ' Acre Mortgage</p></div></div></footer>';
  }
  function estHTML(root) {
    var title = root.getAttribute('data-est-title'); if (!title) return '';
    var down = parseFloat(root.getAttribute('data-down') || '5');
    return '<section class="p-est"><div class="wrap"><div class="panel"><div><span class="kicker">Estimate your payment</span><h2>' + esc(title) + '</h2>' +
      '<p class="lede">Principal and interest at today\'s national average 30-year rate, with the down payment or equity this program typically involves. Taxes and insurance are added at pre-approval.</p></div>' +
      '<div class="card"><div class="big"><b id="est-pi">$0</b><span>/mo principal &amp; interest</span></div>' +
      '<div class="row"><div class="lbl"><span>Home price</span><output id="o-price">$375,000</output></div><input type="range" id="i-price" min="100000" max="1500000" step="5000" value="375000" aria-label="Home price"></div>' +
      '<div class="row"><div class="lbl"><span>Down payment or equity</span><output id="o-down">' + down + '%</output></div><input type="range" id="i-down" min="0" max="70" step="0.5" value="' + down + '" aria-label="Down payment percent"></div>' +
      '<div class="row"><div class="lbl"><span>Rate</span><output id="o-rate">6.75%</output></div><input type="range" id="i-rate" min="4" max="9" step="0.125" value="6.75" aria-label="Interest rate"></div>' +
      '<p class="fine" id="est-note">30-year fixed. Rate starts at today\'s national average and is not a quote.</p><a class="btn btn-green btn-sm" href="#apply">Get a real quote</a></div></div></div></section>';
  }
  function relatedHTML(root) {
    var slugs = (root.getAttribute('data-related') || '').split(',').filter(Boolean);
    var cards = slugs.map(function (s) { var p = PROGRAMS.filter(function (x) { return x.slug === s; })[0]; if (!p) return ''; return '<a class="rel" href="' + CFG.SITE + '/' + p.slug + '"><small>' + esc(p.group) + '</small><h3>' + esc(p.name) + '</h3><p>' + esc(p.short) + '</p><span class="go">Learn more ' + I.arrow + '</span></a>'; }).join('');
    return cards ? '<section class="related"><div class="wrap"><span class="kicker">Compare</span><h2>Other programs worth a look.</h2><div class="rel-grid">' + cards + '</div></div></section>' : '';
  }
  function bandHTML() {
    return '<section class="lo-band"><div class="wrap"><div class="panel"><div><h2>Talk to a loan officer licensed in your state.</h2><p>62 loan officers across 25 branches, licensed in 15 states and Washington, DC. The person who pre-approves you is the person who closes you.</p></div>' +
      '<div class="acts"><a class="btn btn-black" href="#apply">See if I qualify</a><a class="btn btn-soft" href="' + CFG.SITE + '/#experts">Find a loan officer</a></div></div></div></section>';
  }
  function wire(root) {
    var $ = function (s) { return root.querySelector(s); };
    var nav = $('#nav'), tg = $('#nav-toggle');
    if (tg) {
      var close = function () { nav.classList.remove('open'); tg.setAttribute('aria-expanded', 'false'); };
      tg.addEventListener('click', function () { var o = nav.classList.toggle('open'); tg.setAttribute('aria-expanded', o); });
      Array.prototype.forEach.call(root.querySelectorAll('.nav-links a, .nav-right a'), function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); tg.focus(); } });
      var sc = null; var onScroll = function () { var s = (window.scrollY || document.documentElement.scrollTop) > 12; if (s !== sc) { sc = s; nav.classList.toggle('scrolled', s); } };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    var price = $('#i-price'), down = $('#i-down'), rate = $('#i-rate');
    if (price) {
      var est = function () { var p = +price.value, d = +down.value, r = +rate.value; var loan = p * (1 - d / 100), m = r / 100 / 12, n = 360; var pi = m ? loan * m / (1 - Math.pow(1 + m, -n)) : loan / n; $('#o-price').value = money(p); $('#o-down').value = d + '%'; $('#o-rate').value = r.toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + '%'; $('#est-pi').textContent = money(pi); };
      [price, down, rate].forEach(function (i) { i.addEventListener('input', est); }); rate.addEventListener('input', function () { rate.dataset.touched = '1'; }); est();
      fetch(CFG.RATES_URL, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function (j) {
        var f30 = (j.items || []).filter(function (i) { return i.key === 'fixed30'; })[0]; if (!f30 || rate.dataset.touched) return;
        rate.value = Math.round(f30.rate * 8) / 8; est();
        $('#est-note').textContent = '30-year fixed at ' + Number(f30.rate).toFixed(2) + '%, the Freddie Mac national average as of ' + new Date(f30.asOf + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '. Not a quote.';
      }).catch(function () {});
    }
  }
  function init() {
    var root = document.getElementById('acre-program'); if (!root || root.dataset.ready) return; root.dataset.ready = '1';
    // GHL wraps the pasted block in section > row > column, each carrying default
    // top/bottom padding (20/10/10). The homepage has these zeroed; match it so the
    // sticky nav sits flush at the top and the footer sits flush at the bottom.
    (function () {
      var w = root.parentElement;
      while (w && w !== document.body) {
        if (/c-section|c-row|c-column|c-custom-code|custom-code-container/.test(w.className || '')) {
          w.style.paddingTop = '0px'; w.style.paddingBottom = '0px';
        }
        w = w.parentElement;
      }
    })();
    var fill = function (name, html) { var el = root.querySelector('[data-slot="' + name + '"]'); if (el) el.innerHTML = html; };
    // Replace the nav slot rather than filling it: a sticky element can only travel
    // inside its own parent, and the slot div is only as tall as the header, so
    // filling it leaves the nav unable to stick. Swapping the wrapper out makes the
    // header a direct child of #acre-program, matching acre-lo.js and the homepage.
    var navSlot = root.querySelector('[data-slot="nav"]');
    if (navSlot) navSlot.outerHTML = navHTML();
    fill('after', estHTML(root) + relatedHTML(root) + bandHTML() + footerHTML());
    wire(root);
    autoSize(root);
  }
  // The GHL survey runs iframe-resizer inside; send its init handshake and apply the heights it reports so the card fits the step.
  function autoSize(root) {
    var fr = root.querySelector('.apply iframe'); if (!fr) return;
    var fid = fr.id;
    var initSizer = function () { try { fr.contentWindow.postMessage('[iFrameSizer]' + fid + ':8:false:false:32:true:true:null:offset:null:null:0:false:parent:true', '*'); } catch (e) {} };
    fr.addEventListener('load', initSizer); setTimeout(initSizer, 1500); setTimeout(initSizer, 4000);
    window.addEventListener('message', function (e) {
      if (typeof e.data !== 'string' || e.data.indexOf('[iFrameSizer]' + fid + ':') !== 0) return;
      var h = parseInt(e.data.slice(13).split(':')[1], 10);
      if (h > 0) { fr.style.minHeight = '0'; fr.style.height = (h + 6) + 'px'; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
