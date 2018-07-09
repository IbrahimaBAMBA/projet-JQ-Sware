$(function(){
  $('#basketModal tbody tr[ref=ref]').hide();
  var panier = [];

  $('button[name=addToBasket]').click(function(){
    var ref = $(this).attr('id').toString();
    var articleTitle = $('#title-' + ref).text().toString();
    var description = $('#description-' + ref).text().toString();
    var price = $('#price-' + ref + ' span').text().toString();
    var imgSrc = $('#img-' + ref).attr('src').toString();
    // creation de l'objet JS  = article ajouté au panier avec ses propriétés. nom de l'objet = ref article
    eval('var ' + ref + ' ={ ref:ref, titre:articleTitle, img:imgSrc, desc:description, price:price, qt:1};');
    // ajout de l'objet au tableau panier[]
    panier.push(eval(ref));

    // tableau pour gestion des quantités
    var quantiteTableau = [];
    prixTotal = 0;
    $.each( panier, function( i, val ) {
      prixTotal = prixTotal+parseFloat(val.price);
      prixTotal = Math.round(prixTotal*100)/100;
      $.each(quantiteTableau,function(j,val2){
        if(val.ref == val2.ref){
          val.qt++;
        }
      });
      quantiteTableau.push(eval(val));
    });


    //ajout panier-encart/modal ou incrémentation quantité
    var indexArticle = panier.indexOf(eval(ref)); // index de l'objet-ref{} dans panier[]
    if(panier[indexArticle].qt == 1){
      // création list item encart
      $('<li class="list-group-item" id="quantity' + ref + '"><span class="tag tag-default tag-pill float-xs-right"> ' + panier[indexArticle].qt + '</span>x ' + panier[indexArticle].titre + '.</li>').appendTo('#basket');
      // creation table row modal
      var clone = $('#basketModal tbody tr[ref=ref]').clone();
      clone.attr('ref', ref);
      clone.appendTo($('#basketModal tbody'));
      $('#basketModal tbody tr[ref=' + ref + '] img').attr('src', imgSrc);
      $('#basketModal tbody tr[ref=' + ref + '] td:nth-child(2)').html(articleTitle);
      $('#basketModal tbody tr[ref=' + ref + '] td form input[placeholder=quantite]').val(panier[indexArticle].qt);
      $('#basketModal tbody tr[ref=' + ref + '] td form #totalRefPrice').val((panier[indexArticle].qt)*(price));
      clone.show();
      $('#totalNetPrice').val(prixTotal);
    } else if(panier[indexArticle].qt >1 ){
      // ajout quantité encart
      $('#quantity' + ref + ' span').html(panier[indexArticle].qt);
      // ajout quantité modal
      $('#basketModal tbody tr[ref=' + ref + '] td form input[placeholder=quantite]').val(panier[indexArticle].qt);
      $('#basketModal tbody tr[ref=' + ref + '] td form #totalRefPrice').val((panier[indexArticle].qt)*(price));
      $('#totalNetPrice').val(prixTotal);
    }

    // notif confirmation ajout
     $.notify({
     	title: '<h4>' + articleTitle + '</h4>',
     	message: 'article ajouté à votre panier'
     },{
     	type: 'success',
    	placement: {
    		from: "top",
    		align: "right"
    	},
    	delay: 1000,
    	timer: 500,
     });

  });

  $('#basketModalButton').click(function(){

  });

  $('#tester').click(function(){
    // var ref = $(this).attr('reference').toString();
    console.log('test');
  });
  $('input.minus').click(function(){
  });


  });
