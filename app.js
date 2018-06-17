$( document ).ready(function() {
    var cards = [{name:'2_of_clubs',points:2},{name:'2_of_diamonds',points:2},{name:'2_of_hearts',points:2},{name:'2_of_spades',points:2},
    {name:'3_of_clubs',points:3},{name:'3_of_diamonds',points:3},{name:'3_of_hearts',points:3},{name:'3_of_spades',points:3},
    {name:'4_of_clubs',points:4},{name:'4_of_diamonds',points:4},{name:'4_of_hearts',points:4},{name:'4_of_spades',points:4},
    {name:'5_of_clubs',points:5},{name:'5_of_diamonds',points:5},{name:'5_of_hearts',points:5},{name:'5_of_spades',points:5},
    {name:'6_of_clubs',points:6},{name:'6_of_diamonds',points:6},{name:'6_of_hearts',points:6},{name:'6_of_spades',points:6},
    {name:'7_of_clubs',points:7},{name:'7_of_diamonds',points:7},{name:'7_of_hearts',points:7},{name:'7_of_spades',points:7},
    {name:'8_of_clubs',points:8},{name:'8_of_diamonds',points:8},{name:'8_of_hearts',points:8},{name:'8_of_spades',points:8},
    {name:'9_of_clubs',points:9},{name:'9_of_diamonds',points:9},{name:'9_of_hearts',points:9},{name:'9_of_spades',points:9},
    {name:'10_of_clubs',points:10},{name:'10_of_diamonds',points:10},{name:'10_of_hearts',points:10},{name:'10_of_spades',points:10},
    {name:'ace_of_clubs',points:11},{name:'ace_of_diamonds',points:11},{name:'ace_of_hearts',points:11},{name:'ace_of_spades',points:11},
    {name:'jack_of_clubs',points:10},{name:'jack_of_diamonds',points:10},{name:'jack_of_hearts',points:10},{name:'jack_of_spades',points:10},
    {name:'king_of_clubs',points:10},{name:'king_of_diamonds',points:10},{name:'king_of_hearts',points:10},{name:'king_of_spades',points:10},
    {name:'queen_of_clubs',points:10},{name:'queen_of_diamonds',points:10},{name:'queen_of_hearts',points:10},{name:'queen_of_spades',points:10},
];

var coins = [{name:'coin5',price:5},{name:'coin10',price:10},{name:'coin20',price:20},
];

    
    var bet = 0;
    var playerPoints = 0;
    var dealerPoints = 0;
    var cash = 500;
    var coinPrice = 0;
	var win = 0;

    var dealerCard = '';
    var dealerStartCard = 0;

    $('#cash').text(cash);
	$('#win').text(win);
	
    $( '#hit' ).click(function() {
        let bust = function() { 
            $('#info').fadeIn()
            $('#info').text('BUST!')
            
			$('#hit').css('display','none')
			$('#stand').css('display','none')
            $('#rebet').css('display','block')
            $('#reset').css('display','block')

           
			
        }
        
        let x = Math.floor(Math.random() * cards.length);
        let newCard = '<div class=\'newCard\' id=\'newCard'+$( '.newCard' ).length+'\' style=\'background:url(./cards/'+cards[x].name+'.jpeg)\'></div>';

        $( 'body' ).append(newCard);
        $( '.newCard' ).css({
            'background-size':'100% 100%',
            'background-repeat':'no-repeat',
            'background-color':'white',
        });

        var a = $('.newCard');
        
        for (i=0;i<a.length;i++) {
            $(a[i]).animate({
                'top':'42%',
                'left': (47+(i*2)+2)+'%'
            })
        }
       
        playerPoints += cards[x].points;

        if ( playerPoints > 21 ) {
           bust()
         }

         $('#playerPointsInfo').text(playerPoints);


    });

    $( '.coins' ).click(function(x){
        var coin = '<div id=\''+this.id+'\' class=\'coins\'></div>';
		
        if ( bet < 40 ) {             
            for(i=0;i<coins.length;i++) {
                if ( coins[i].name == this.id && coins[i].price <= (40 - bet) && cash >= coins[i].price && cash >= (bet + coins[i].price) ) { 
                    bet += coins[i].price 					
					$( '#betPrice' ).append(coin) 				
                }
            }            
            $('#yourBet').text(bet)
            $('#reset').css('display','block')
        }
    });

    var startDraw = function(){
        if(bet != 0 && bet <= 40) {
            let x = Math.floor(Math.random() * cards.length);
            let y = Math.floor(Math.random() * cards.length);

            dealerStartCard = cards[y].points;

			 if ( playerPoints > 11 ) {
				cards[36].points = 11;
				cards[37].points = 11;
				cards[38].points = 11;
				cards[39].points = 11;
			}	
			
            dealerPoints += cards[y].points;
            playerPoints += cards[x].points;
			
            //player cards
            $('body').append('<div class=\'startCard\' style=\'background:url(./cards/'+cards[x].name+'.jpeg)\'></div>');
            $( '.startCard' ).css({
                'background-size':'100% 100%',
                'background-repeat':'no-repeat',
                'background-color':'white',
            });
            
            var a = document.getElementsByClassName('startCard');
            var b = document.getElementsByClassName('dealerStartCard');
            
            $(a[0]).animate({
                'top':'42.5%',
                'left':'45%'
            },600)
            $(a[1]).animate({
                'top':'42.5%',
                'left':'47%'
            },600)
            //dealer cards
            dealerCard = cards[y].name
            $('body').append('<div class=\'dealerStartCard\' style=\'background:url(./cards/'+cards[y].name+'.jpeg)\'></div>');
            $( '.dealerStartCard' ).css({
                'background-size':'100% 100%',
                'background-repeat':'no-repeat',
                'background-color':'white',
            });
            $(b[0]).animate({
                'top':'12.5%',
                'left':'45%'
            },600)
            $(b[1]).animate({
                'top':'12.5%',
                'left':'47%',
            },600).css({
                'background':'url(cardTop.png)',
                'background-size':'100% 100%',
                'background-repeat':'no-repeat',
                'background-color':'white'
            })
            if (playerPoints == 22) {
                playerPoints = 21
            }
            $('#playerPointsInfo').text(playerPoints);
            $('#dealerPointsInfo').text(dealerPoints - cards[y].points);
        }
    }

    var yourBet = function(){
        if ( bet != 0 ) {
            $('#playerPointsInfo').css({'display':'block'});
            $('#dealerPointsInfo').css({'display':'block'});
            $('.coins').prop('disabled',true);
            $('#bet').css({'display':'none'});   
            $('#hit').css({'display':'block'}); 
            $('#stand').css({'display':'block'}); 
            $('#reset').css('display','none');

            if(bet > cash) {
                bet = cash
            }

            cash -= bet ;        
           
            $('#cash').text(cash);

            for(i=0;i<2;i++) {
                startDraw() 
            }
        }
    }

    $('#bet').click(yourBet);
    $('#rebet').click(yourBet);

    var dealerDraw = function() {
        let o = Math.floor(Math.random() * cards.length);
        $('body').append('<div class=\'dealerStartCard\' style=\'background:url(./cards/'+cards[o].name+'.jpeg)\'></div>');
		$('.dealerStartCard').css({
			'background-size':'100% 100%',
            'background-repeat':'no-repeat',
            'background-color':'white',
		})
		dealerPoints += cards[o].points;
		var a = $('.dealerStartCard');
        
        for (i=0;i<a.length;i++) {
            $(a[i]).animate({
                'top':'12.5%',
                'left': (43+(i*2)+2)+'%'
            })
        }
	}

    $('#stand').click(function(){
		if (playerPoints != 0) {
			let z = $('.dealerStartCard');

			$(z[1]).css({
				'background':'url(./cards/'+dealerCard+'.jpeg)',
				'background-size':'100% 100%',
				'background-color':'white'
			})

		   while (dealerPoints < 16 ) {
				dealerDraw()
            }
            
			if(playerPoints > dealerPoints || dealerPoints > 21) {
                console.log(playerPoints)
				$('#info').fadeIn();
				$('#info').css({
					'width':'300px',
					'left':'42%'
                })
                $('#info').text('YOU WIN!')
                win = bet*2;
                cash += win;
                $('#cash').text(cash);
                $('#win').text(win);
                $('#playerPointsInfo').text(playerPoints);
                $('#dealerPointsInfo').text(dealerPoints);

                if (playerPoints === 21) {
                    $('#info').css({
                        'width':'400px',
                        'left':'37.5%',
                    })
                    $('#info').text('BLACKJACK!')
                    win = bet*3;
                    cash += win;
                    $('#cash').text(cash);
                    $('#win').text(win);
                }
			}
			
			if (playerPoints == dealerPoints) {
				$('#info').fadeIn();
				$('#info').text('PUSH!')
				$('#info').css({
					'width':'300px',
                    'left':'40%'
                })
                win = bet;
                cash += win;
                $('#cash').text(cash);
                $('#win').text(win);
                $('#playerPointsInfo').text(playerPoints);
                $('#dealerPointsInfo').text(dealerPoints);
			}
			if (playerPoints < dealerPoints && dealerPoints <= 21) {
				$('#info').fadeIn();
				$('#info').text('DEALER WIN!')
				$('#info').css({
					'width':'325px',
                    'left':'40%',
                })
                $('#playerPointsInfo').text(playerPoints);
                $('#dealerPointsInfo').text(dealerPoints);
			}
			
            $('#rebet').css('display','block');
            $('#reset').css('display','block')
			$('#hit').css('display','none');
			$('#stand').css('display','none');
			
			playerPoints = 0;
            dealerPoints = 0;
        }
        
        if (bet == 0) {
            $('#info').fadeIn();
            $('#info').text('YOU LOSE!')
            $('#info').css({
                'width':'400px',
                'left':'40%'
            })
        }
    });
	
	$('#rebet').click(function(){
		$('.newCard').remove()
		$('.startCard').remove()
		$('.dealerCard').remove()
		$('.dealerStartCard').remove()
		
        $('#rebet').css('display','none');
        $('#reset').css('display','none')
		$('#hit').css('display','block');
        $('#stand').css('display','block');
        $('#info').fadeOut();
        
		playerPoints = 0;
		dealerPoints = 0;
		win = 0;
        $('#win').text(win);

        $('#playerPointsInfo').text(playerPoints);
        $('#dealerPointsInfo').text(dealerPoints);

        if (bet > cash) {
            bet = cash
        }

        if (cash == 0 ) {
            $('#info').fadeIn();
            $('#info').text('GAME OVER!')
            $('#info').css({
                'width':'400px',
                'left':'40%'
            })
           
            $('#hit').css('display','none')
            $('#stand').css('display','none')
            $('#dealerPointsInfo').css('display','none')
            $('#playerPointsInfo').css('display','none')            
            $('#betPrice').children().remove();

            preventdefault()
        }

        for(i=0;i<2;i++) {
            startDraw() 
        }
	});
    
    $('#bet').click(function(){
        
    })

    $('#reset').click(function(){
        bet = 0;
        playerPoints = 0;
        dealerPoints = 0;
        win = 0;

        $('#betPrice').children().remove();
        $('.coins').prop('disabled',false);
        $('#bet').css('display','block');
        $('#rebet').css('display','none');
        $('#reset').css('display','none');
        $('#playerPointsInfo').css('display','none');
        $('#dealerPointsInfo').css('display','none');
        $('#info').fadeOut();

        $('.dealerStartCard').remove()
        $('.startCard').remove()
        $('.newCard').remove()
        $('#yourBet').text(bet)
        $('#win').text(win)
    });

    $('.menuButtons').mouseover(function(target){
       $(event.target).css({'left':'0px'},2000)
       
    })
    $('.menuButtons').mouseout(function(target){
        $(event.target).css({'left':'-70px'},2000)
    })
    $('#rulesButton').click(function(){
        $('#rules').fadeToggle();
    })
});