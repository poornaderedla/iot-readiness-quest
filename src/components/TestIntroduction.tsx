import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Lightbulb, Code, Cloud, Cpu, Network, Wrench, DollarSign, TrendingUp } from "lucide-react";
import iotDevicesImage from "@/assets/iot-devices.jpg";

interface TestIntroductionProps {
  onStartTest: () => void;
  onBack: () => void;
}

export function TestIntroduction({ onStartTest, onBack }: TestIntroductionProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Assessment Progress</span>
            <span className="text-sm font-medium">Step 1 of 6</span>
          </div>
          <Progress value={16.7} className="h-2" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              IoT Career Introduction
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Understanding IoT Development</h1>
            <p className="text-xl text-muted-foreground">
              Learn what IoT developers do and whether this career path aligns with your interests
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* What is IoT? */}
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">What is IoT?</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  The Internet of Things (IoT) refers to the network of physical devices embedded with 
                  sensors, software, and connectivity to collect and exchange data. From smart home 
                  devices to industrial sensors, IoT is transforming how we interact with the world.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">What IoT Developers Do</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Cpu className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Design and build smart devices with embedded systems
                  </li>
                  <li className="flex items-start gap-2">
                    <Wrench className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Interface hardware components with software applications
                  </li>
                  <li className="flex items-start gap-2">
                    <Cloud className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Develop cloud connectivity and data processing systems
                  </li>
                  <li className="flex items-start gap-2">
                    <Network className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Work with sensors, microcontrollers, and communication protocols
                  </li>
                </ul>
              </Card>
            </div>

            {/* Visual */}
            <div className="space-y-8">
              <div className="relative">
                <img 
                  src={iotDevicesImage} 
                  alt="IoT Devices and Components" 
                  className="w-full rounded-lg shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>

              <Card className="p-6 bg-gradient-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-success" />
                  <h3 className="text-xl font-semibold">Career Outlook</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-success">$85K-$125K</div>
                    <div className="text-sm text-muted-foreground">Salary Range</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                      <TrendingUp className="w-6 h-6" />
                      22%
                    </div>
                    <div className="text-sm text-muted-foreground">Job Growth</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Job Roles */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Typical IoT Job Roles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "IoT Developer",
                  description: "Create embedded applications and device interfaces",
                  salary: "$85K-$110K"
                },
                {
                  title: "Embedded Systems Engineer",
                  description: "Work with microcontrollers and low-level hardware",
                  salary: "$90K-$115K"
                },
                {
                  title: "IoT Solutions Architect",
                  description: "Design complete IoT ecosystems from devices to cloud",
                  salary: "$120K+"
                },
                {
                  title: "Firmware Developer",
                  description: "Develop firmware for embedded chips and devices",
                  salary: "$95K-$125K"
                }
              ].map((role, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-primary">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <div className="font-bold text-success">{role.salary}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills & Traits */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "C/C++", "Python", "JavaScript", "Arduino", "Raspberry Pi", 
                  "ESP32", "MQTT", "HTTP/REST", "Cloud Platforms", "Sensors", 
                  "Circuit Design", "Linux"
                ].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Personality Traits That Succeed</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  Problem-solver who enjoys debugging
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  Curious and detail-oriented
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  Comfortable with hands-on work
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  Enjoys real-world applications
                </li>
              </ul>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-primary text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Discover Your IoT Potential?</h2>
              <p className="text-lg mb-6 text-blue-100">
                Let's evaluate your fit across psychology, aptitude, and technical readiness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={onBack}
                >
                  Back to Overview
                </Button>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={onStartTest}
                  className="group bg-white text-primary hover:bg-white/90"
                >
                  Start Evaluation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}