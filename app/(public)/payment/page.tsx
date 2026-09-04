"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Shield, Lock, CreditCard, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: Record<string, any> = {
    monthly: {
      name: "Monthly",
      price: 1599,
      period: "month",
      trial: 30,
    },
    "6_month": {
      name: "6 Month",
      price: 9594,
      period: "one-time (7 months)",
      trial: 30,
      bonus: 1,
    },
    "12_month": {
      name: "12 Month",
      price: 19188,
      period: "one-time (15 months)",
      trial: 30,
      bonus: 3,
    },
  };

  useEffect(() => {
    const planId = localStorage.getItem("selected_plan");
    if (!planId || !plans[planId]) {
      router.push("/select-plan");
      return;
    }
    setSelectedPlan(plans[planId]);
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate Razorpay integration
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store trial activation
      localStorage.setItem("trial_activated", "true");
      localStorage.setItem("trial_start", new Date().toISOString());

      // Set mock auth token
      localStorage.setItem("auth_token", "demo_token_" + Date.now());
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "usr_demo",
          name: "Demo User",
          email: localStorage.getItem("registration_email") || "demo@example.com",
          phone: "+919876543210",
          role: "user",
          status: "trial",
        })
      );

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    );
  }

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + selectedPlan.trial);

  const billingStartDate = new Date(trialEndDate);
  billingStartDate.setDate(billingStartDate.getDate() + 1);

  return (
    <div className="min-h-screen bg-primary-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/final logo.svg"
              alt="DataDelimited Logo"
              width={200}
              height={50}
              className="h-10 w-auto mx-auto mb-6"
            />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Complete Your Setup</h1>
          <p className="text-text-secondary text-lg">
            Start your free trial and enter payment details for after the trial period
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">
                    {selectedPlan.name}
                  </h3>
                  {selectedPlan.bonus && (
                    <Badge variant="success" className="mb-3">
                      +{selectedPlan.bonus} Month{selectedPlan.bonus > 1 ? "s" : ""} Free
                    </Badge>
                  )}
                  <p className="text-text-secondary text-sm">{selectedPlan.period}</p>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Plan Price:</span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(selectedPlan.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Free Trial:</span>
                    <span className="font-semibold text-success">{selectedPlan.trial} days</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-semibold text-text-primary">Due Today:</span>
                    <span className="text-2xl font-bold text-success">₹0</span>
                  </div>
                </div>

                <Alert variant="info">
                  <AlertDescription className="text-xs">
                    Your subscription will automatically start on{" "}
                    {billingStartDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-text-secondary text-sm">
                <Shield className="mr-2 text-success" size={18} />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center text-text-secondary text-sm">
                <Lock className="mr-2 text-success" size={18} />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center text-text-secondary text-sm">
                <CheckCircle2 className="mr-2 text-success" size={18} />
                <span>Secured by Razorpay</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CreditCard className="mr-2 text-teal" size={24} />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="info">
                  <AlertDescription>
                    <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
                    In production, Razorpay payment gateway would be integrated here.
                  </AlertDescription>
                </Alert>

                {/* Mock Payment Form */}
                <div className="bg-primary-bg-secondary p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Card Details (Demo)
                  </h3>
                  <div className="space-y-4 opacity-50 pointer-events-none">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Card Number
                      </label>
                      <div className="flex items-center input-dark px-4 py-3">
                        <CreditCard className="mr-2 text-text-muted" size={20} />
                        <span className="text-text-secondary">4242 4242 4242 4242</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Expiry Date
                        </label>
                        <div className="input-dark px-4 py-3 text-text-secondary">12/25</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          CVV
                        </label>
                        <div className="input-dark px-4 py-3 text-text-secondary">123</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trial Information */}
                <div className="bg-gradient-teal p-6 rounded-lg text-white">
                  <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span>Start your 30-day free trial immediately</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span>Full access to all features during trial</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span>
                        First charge on {billingStartDate.toLocaleDateString("en-IN")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span>Cancel anytime before trial ends to avoid charges</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Activating Trial...
                      </>
                    ) : (
                      "Start Free Trial"
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push("/select-plan")}
                    disabled={isProcessing}
                  >
                    ← Change Plan
                  </Button>
                </div>

                <p className="text-text-muted text-xs text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                  Your card will not be charged during the trial period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
