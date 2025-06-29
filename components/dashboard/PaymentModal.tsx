'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

interface Roadmap {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: Roadmap;
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, roadmap, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would integrate with Stripe or another payment processor
      toast.success('Payment successful! Welcome to the course!');
      onSuccess();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Complete Your Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={roadmap.image_url}
                  alt={roadmap.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{roadmap.title}</h3>
                  <p className="text-2xl font-bold text-green-600">${roadmap.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('card')}
                className="flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </Button>
              <Button
                variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('paypal')}
                className="flex items-center space-x-2"
              >
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span>PayPal</span>
              </Button>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
              </div>
              <p className="text-gray-600">
                You'll be redirected to PayPal to complete your payment
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <LoadingSpinner className="w-4 h-4" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Pay ${roadmap.price}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}