// const express = require('express');
// const cors = require('cors');
// const bodyparser = require('body-parser');
// const app=express();
// app.use(express.static('public'));
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());
// app.use(cors({ origin: true, credentials: true}));
// const stripe = require('stripe')('sk_test_51LTP0gKbbX8B7nJ2GrynHlh2bra8GiYhRxz2W0wsRzXtB2RSFyz8OVdPLbQBL6fBfJ4OX4TMfgY58UvsU9xhVUhE00XLGChwES');
// app.post('/checkout', async (req, res, next) =>{
//     try {
//         const session = await stripe.checkout.session.create({
//             line_items: req.body.items.map((item)=>({
//                 price_data:{

//                     currency: 'usd',
//                     product_data: {
//                         name: item.name,
//                         images: [item.product]
//                     },
//                     unit_amount: item.price * 100
//                 },
//                 quatity: item.quantity,
//             })),
//             mode: 'payment',
//             success_url:'http://localhost:4242/success.html',
//             cancel_url:'http://localhost:4242/cancel.html',
//         });
//         res.status(200).json(session);
//     } catch (error) {
//         next(error);
//     }
// });
// app.listen(4242, ()=>{
//     console.log('Your app is running on port 4242: localhost:4242');
// })


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')('sk_test_51LTP0gKbbX8B7nJ2GrynHlh2bra8GiYhRxz2W0wsRzXtB2RSFyz8OVdPLbQBL6fBfJ4OX4TMfgY58UvsU9xhVUhE00XLGChwES');

app.post('/checkout', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.product]
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/cancel.html'
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => {
  console.log('Your app is running on port 4242: localhost:4242');
});


// // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51LTP0gKbbX8B7nJ2GrynHlh2bra8GiYhRxz2W0wsRzXtB2RSFyz8OVdPLbQBL6fBfJ4OX4TMfgY58UvsU9xhVUhE00XLGChwES');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));