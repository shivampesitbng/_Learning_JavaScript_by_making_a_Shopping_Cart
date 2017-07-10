/******** SHOPING  CART FUCN ******/
		
	//var shoppingCart = {};
	
	var shoppingCart = (function(){
		/************ PRIVATE **************/
		// private Methods & properties ====>
		var cart = [];
		Item = function (name,price,count) {
			this.name = name 
			this.price = price
			this.count = count
		};
		saveCart = function(){
	  //function saveCart() {

        //localStorage accepts two parameters
        //variables -> shoppingCart
        //value -> cart
        //localStorage.setItem("shoppingCart",cart);

        //localStorage is best for strings & numbers
        //our cart has more complex data structure
        //its an array(cart),and each item in array is object
        //having different properties
        //So we will convert our cart in sort of string,
        //string describing the array and the objects

        //So we will use JSON object here
        //JSON stands for -> javascript object notation
        //JSON is way of writing javascript object & array as string
        //It is good way to pass around information
        //Then, we can read those strings back in

        localStorage.setItem("shoppingCart",JSON.stringify(cart));
      };

      //trying localStorage with simple string
   //   localStorage.setItem("username","shivam");

      //we want to save the cart/ call function saveCart();
      // everytime we edit the cart
      //i.e inside function ->
      //addItemToCart,removeItemFromCart,
      //removeItemFromCartAll & clearCart


      //loadcart()
      loadcart = function(){
	  //function loadcart(){
        cart = JSON.parse(localStorage.getItem("shoppingCart")); 
		//JSON.parse is other half of JSON.stringify to loadcart.
		//cart is global,it is not attach/belongs to shoppingCart
	  };
/*************** PUBLIC *******************/
		//Public  Methods =>>>>
		var obj = {};
		
		//addItem
		obj.addItemToCart = function(name,price,count){
		  //function addItemToCart(name,price,count) {
			//check if an item already exist in the cart
			//if so,increment the count of that item in the cart
			//instead of adding the item again in the cart separately
			for(var i in cart){ //for evrey item in cart
			  if (cart[i].name === name){ // if item name matches in cart
				cart[i].count += count ; //update/increment count of item
				saveCart(); 
				return; //exit from loop  //returing here so saveCart() not calling
				//break skip LOOP
			 }
			}
			var item = new Item(name,price,count);
			cart.push(item);
			saveCart(); //we are under shoppingCart method , save Cart is also under same method so we use this here
		};
		//
		obj.setCountForItem = function(name,count){
				for(var i in cart){
					if(cart[i].name === name )
						cart[i].count = count;
						break;
				}
				saveCart();
		};
		//removeItemFromCart(name) //remove one item
	obj.removeItemFromCart=function(name) {
	  //      function removeItemFromCart(name) {
        for(var i in cart) { //for evrey item in cart
          if(cart[i].name === name){ // if item name matches in cart
            cart[i].count--;//decrement count of item
            //remove item from the cart completely,when count become 0
            //otherwise the count will get negative
            if(cart[i].count === 0){
              //Splice will remove the item from the array
              //first argument -> which item to remove
              //second argument -> how many item to remove
              cart.splice(i,1);
            }
            break;
          }
        }
        saveCart();
      };
	  //removeItemFromCartAll(name) //remove all item of that name
     obj.removeItemFromCartAll = function(name){
	 // function removeItemFromCartAll(name){
        for(var i in cart){
          if(cart[i].name === name) {
           cart.splice(i,1) ;
              break;
            }
        }
        saveCart();
      };
	  //clearCart()
      obj.clearCart = function(){
	  //function clearCart() {
	  console.log("calling ClearCart");
       cart =[];
        saveCart();
      };
	  //countCart() //return totol count
      obj.countCart = function(){
	  //function countCart(){
        var totalCount = 0; //we need a variable to count that starts with 0
        for(var i in cart){
          totalCount += cart[i].count; //add count to the variable of each item
        }
        return totalCount;
      };
	  
	  obj.countCart2 = function() {
		//var totalCount2 = 0;
		//for(var i in this.cart){
			return cart.length;
		//}
		//return totalCount2;
	  };
	  //totalCart() //return total cost
      obj.totalCart = function(){
	  //function totalCart(){
        var totalCost = 0;
        for(var i in cart){
          totalCost += cart[i].price * cart[i].count; //was working only for 1 item of each type , not multiplying with count so multipled with count
        }
		
        return totalCost.toFixed(2); //toFixed will 
		//round off to 2 dec place
      };


	/**** IMP ***/
      //listCart()  //return => array of items -> to display cart
      obj.listCart = function(){
	  //function listCart(){
        //if we slice here we will copy of the cart array
        //but the objects inside will be the references of the same objects
        //that we have in the original cart
        //return cart.slice();

        //so, creating copy of object also
        //javascript doesnot have a function to duplicate/create copy/slice
        // a object directly
        var cartCopy = []; //creating copy of the cart
        for(var i in cart){ //loop through each item in cart
          //everytime we loop through item in cart
          // create a variable called item which is the item in the cart
          // & then create an itemCopy which is an Object
          var item = cart[i]; //each time one item will be copied
          //in variable: item from array: cart
          var itemCopy={};
          for(var p in item) { // p stands for property
            //loop through each property in item
            itemCopy[p] = item[p]; //creating copy
            //of every property of each item
          }
		  itemCopy.total = (item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy); //To add itemCopy to cartCopy
        }
        return cartCopy;
        //return cart;
        //return cart.slice(); // it will return copy of original array
        //but the objects inside the array will not be the copy
        //instead they are references of original
      };
		
		//saveCart()

      //we will use : Local Storage to save the cart
      //it will retrieve the cart
      //even if we restart browser
      //or reload the page
      //or if move to the next page on the website

      //need for saveCart() =>
      //everytime you load the page browser just earses the javascript
      //and reload the javascript again into the page
      //so variables are lost where shoppingCart is saved i.e cart[].

     
	  
	  
	 

      //addItemToCart("apple",100,5);
      //even if we comment addItemToCart
      //we get an item in cart from localStorage
      loadcart(); 
	//displayCart();
      //to display cart ->
      //list cart returns an array containing the cart
 /*     var array = shoppingCart.listCart();
      console.log(array);
	  
	  console.log("shoppingCart:cart");
	  console.log(shoppingCart.cart); //empty :o
	  console.log("Global Cart:"); */
	 // console.log(cart); //contain items, from load cart itm came

	  //so attach this.cart everywgere
	  
		
		
		return obj;
	})();
	
