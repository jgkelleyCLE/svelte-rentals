<script>
	import { sendEmail } from "$lib/api/emailApi";
    import * as Dialog from "$lib/components/ui/dialog";
    import DayPicker, { Mode } from 'svelte-day-picker';
	import { toast } from "svelte-sonner";
    import { cart, cartActions } from "$lib/stores/cartStore";
	import { derived } from "svelte/store";
	import { createOrder } from "$lib/api/ordersApi";
	import { createMutation } from "@tanstack/svelte-query";
	import { goto } from "$app/navigation";

    const cartItems = derived(cart, $cart => $cart.cartList)
    console.log($cartItems)

    let { subtotal, taxPrice, deliveryFee, total } = $props()
    console.log("SUBTOTAL: ", $subtotal)
    console.log("TAX: ", $taxPrice)
    console.log(deliveryFee)
    console.log("TOTAL: ", $total)

    let open = $state(false);

    let title = $state("");
    let email = $state("");
    let selected = $state()
    $inspect(selected)
   

    const emailHandler = (cart, $subtotal, deliveryFee, $taxPrice, $total, email, selected) => {

        
        sendEmail({cart: $cartItems, $subtotal, deliveryFee, $taxPrice, $total, email, selected, title})
        
        open = false
        title = ''
       email = ''
       selected = ''
        toast.success("Email sent",)

    }

    const orderMutation = createMutation({
                mutationFn: ()=> createOrder({
                    title,       
                    cart: $cartItems,
                    eventDate: selected,
                    itemsPrice: $subtotal,
                    taxPrice: $taxPrice,
                    shippingPrice: deliveryFee,  
                    totalPrice: $total,
                    orderStatus: 'Quote'
                }),
                onSuccess: ()=> {
                    toast.success("Order created successfully")
                    open = false
                    title = ''
                    email = ''
                    selected = ''
                    goto('/thank-you')
                },
                onError: (error) => {
                    toast.error("Error creating order")
                    console.log("ORDER ERROR: ", error)
                }
            })

            const emailMutation = createMutation({
                mutationFn: (emailData) => sendEmail({
                    cart: $cartItems,
                subtotal: $subtotal,
                deliveryFee,
                taxPrice: $taxPrice,
                total: $total,
                email,
                selected,
                title       
            }),
                onSuccess: ()=> {
                    toast.success("Email sent successfully")
                },
                onError: (error) => {
                    toast.error("Error sending email")
                    
                }
            })

    const submitHandler = (e) => {
        e.preventDefault();
        if(!title){
            toast.error("Title is required.")
            return
        }else if(!email){
            toast.error("Email is required.")
            return
        }
        else if(!selected){
            toast.error("Date is required.")
            return
        }
        else {
            
            
            $emailMutation.mutate({
                cart: $cartItems.cart,
                subtotal: $subtotal,
                deliveryFee,
                taxPrice: $taxPrice,
                total: $total,
                email,
                selected,
                title
            })

            if(title && email){

                $orderMutation.mutate({
                    title,       
                    cart: $cartItems,
                    eventDate: selected,
                    itemsPrice: $subtotal,
                    taxPrice: $taxPrice,
                    shippingPrice: deliveryFee,  
                    totalPrice: $total,
                    orderStatus: 'Quote'
                })
                
                
            }
        }
    }
    
</script>


<Dialog.Root>
    <Dialog.Trigger class="w-full">
        <p class="bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md mt-2 mb-1 w-full text-white">Email Quote</p>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Email Quote</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <div class="w-full flex i">
            <form class="flex flex-col items-center w-full" onsubmit={submitHandler}>
                <input required class="border-2 border-gray-300 p-2 rounded-md my-1 w-full" placeholder='Event Title' type="text" bind:value={title} />
                    
                    <p>Date of event:</p>
                    <DayPicker
                        bind:selected={selected}
                        
                        />
                        <!-- <input type="date" bind:value={selected} /> -->

                    <input required class="border-2 border-gray-300 p-2 rounded-md my-1 w-full" placeholder='Your email address' type="text" bind:value={email}  />
                    <button class="bg-safariOrange hover:bg-safariOrangeHover text-white w-full p-2 rounded-md" type="submit">{orderMutation.isPending ? 'Submitting...' : 'Submit'}</button>
                </form>

        </div>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>