import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Contact = () => {
  return (
    <section id="contactus">
      <div className="bg-primary text-white mx-auto py-20 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="text-4xl font-bold justify-center items-center text-center text-secondary">
          <h1>Contact Us</h1>
        </div>
        <div className="mt-10 justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="w-65 h-60 bg-secondary border-none">
            <CardHeader>
              <CardTitle>
                <Avatar className="mx-auto w-24 h-24 mt-2 overflow-hidden border border-yellow-500">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-xl font-semibold">
                <p>CACA BAUU</p>
                <p>0895348538087</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
